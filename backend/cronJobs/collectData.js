import cron from 'node-cron';
import models from '../models/index.js';
import { Op } from 'sequelize';
import { readFile } from 'fs/promises';
import { readdir } from 'fs/promises';
import { appendFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { Solar } from 'lunar-javascript';
import fs from 'fs/promises';
import path from 'path';
import { trainModelService } from '../services/predictServices/trainModelService.js';
import { getWeatherService } from '../services/predictServices/getWeatherService.js';
import { predictGuestsService } from '../services/predictServices/predictGuestsService.js';

dotenv.config();
export const collectData = async () => {
    cron.schedule(
        '0 23 * * *',
        async () => {
            console.log('--------------------------------------------------');
            console.log(
                '[CRON] Bắt đầu thu thập dữ liệu lượng khách trong ngày',
            );

            const hotels = await models.Hotel.findAll({
                where: { predict: true },
            });
            if (hotels.length > 0) {
                // Lấy ngày hôm nay
                const today = new Date();
                const currentDay = today.toISOString().slice(0, 10);
                const daysOfWeek = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ];
                // Lấy ngày trong tuần
                const dayOfWeek = daysOfWeek[today.getDay()];
                // console.log(currentDay);
                // console.log(dayOfWeek);

                // Lấy lịch âm
                const year = today.getFullYear();
                // Lấy tháng
                const month = today.getMonth() + 1;
                const day = today.getDate();
                const solar = Solar.fromYmd(year, month, day);
                const lunar = solar.getLunar();
                // console.log(
                //     `Ngày âm của hôm qua: ${lunar.getDay()}/${lunar.getMonth()}`,
                // );
                // console.log(day);
                // console.log(month);

                // Lấy danh sách ngày lễ âm và dương lịch
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);

                const lunarFilePath = join(
                    __dirname,
                    '../data/holidays/lunar_holidays.json',
                );
                const solarFilePath = join(
                    __dirname,
                    '../data/holidays/solar_holidays.json',
                );

                const lunarJsonString = await readFile(lunarFilePath, 'utf8');
                const solarJsonString = await readFile(solarFilePath, 'utf8');
                const lunarHolidays = JSON.parse(lunarJsonString);
                const solarHolidays = JSON.parse(solarJsonString);

                // Kiểm tra ngày lễ
                const lunarDay = lunar.getDay();
                const lunarMonth = lunar.getMonth();
                const lunarDate = `${lunarDay}/${lunarMonth}`;
                const isLunarHoliday = lunarHolidays.some(
                    (h) => h.day === lunarDay && h.month === lunarMonth,
                );
                const isSolarHoliday = solarHolidays.some(
                    (h) => h.day === day && h.month === month,
                );
                const isHoliday = isLunarHoliday || isSolarHoliday ? '1' : '0';

                for (const hotel of hotels) {
                    // Lượng khách
                    let guests = 0;
                    const bookings = await models.Booking.findAll({
                        include: [
                            {
                                model: models.Room,
                                as: 'room',
                                include: [
                                    {
                                        model: models.RoomType,
                                        as: 'room_type',
                                    },
                                ],
                            },
                        ],

                        where: {
                            hotel_id: hotel.id,
                            status: 'confirmed',
                            check_in: { [Op.lte]: today },
                            check_out: { [Op.gte]: today },
                        },
                    });

                    if (bookings.length > 0) {
                        for (const booking of bookings) {
                            guests += booking.room.room_type.capacity;
                        }
                    }

                    // Lấy thông tin thời tiết và nhiệt độ
                    const res = await getWeatherService({
                        lat: hotel.lat,
                        lon: hotel.lon,
                    });
                    // console.log(res);
                    const weather = res.weather[0].main;
                    const unRoundedtemp = res.main.temp - 273.15;
                    const temp = Number(unRoundedtemp.toFixed(1));
                    // console.log(weather);
                    // console.log(temp);

                    // Kiểm tra voucher hoạt động không
                    const voucher = await models.Voucher.findOne({
                        where: {
                            hotel_id: hotel.id,
                            start_date: { [Op.lte]: today },
                            end_date: { [Op.gte]: today },
                        },
                    });

                    const voucherActive = voucher ? '1' : '0';

                    // Cập nhật lượng khách cho db
                    let predictedData = await models.Predict.findOne({
                        where: {
                            hotel_id: hotel.id,
                            date: currentDay,
                        },
                    });

                    if (!predictedData) {
                        const res = await predictGuestsService({
                            hotelId: hotel.id,
                        });
                        predictedData = await models.Predict.findOne({
                            where: {
                                hotel_id: hotel.id,
                                date: currentDay,
                            },
                        });
                    }

                    await models.Predict.update(
                        { actual_guests: guests },
                        { where: { id: predictedData.id } },
                    );

                    // Tìm file csv
                    const dataDir = path.join(__dirname, '../data');
                    const targetFileName = `data_${hotel.id}.csv`;

                    let dataFilePath;

                    try {
                        const files = await readdir(dataDir);
                        const matchedFile = files.find(
                            (file) => file === targetFileName,
                        );

                        if (matchedFile) {
                            dataFilePath = path.join(dataDir, matchedFile);
                        } else {
                            dataFilePath = path.join(
                                dataDir,
                                `model_${hotel.id}.csv`,
                            );
                        }

                        const header =
                            'date,lunar_date,day_of_week,month,is_holiday,weather_condition,temperature,voucher_active,number_of_guests\n';
                        const newRow = `${currentDay},${lunarDate},${dayOfWeek},${month},${isHoliday},${weather},${temp},${voucherActive},${guests}\n`;
                        console.log(newRow);

                        try {
                            // Kiểm tra file có tồn tại không
                            await fs.access(dataFilePath).catch(async () => {
                                // File chưa tồn tại -> tạo file mới với header
                                await fs.writeFile(
                                    dataFilePath,
                                    header,
                                    'utf8',
                                );
                            });

                            // Append dòng mới
                            await fs.appendFile(dataFilePath, newRow, 'utf8');
                            console.log(
                                `✅ Đã thêm dòng vào ${path.basename(
                                    dataFilePath,
                                )}`,
                            );
                        } catch (err) {
                            console.error(
                                `❌ Lỗi khi ghi vào file ${path.basename(
                                    dataFilePath,
                                )}:`,
                                err,
                            );
                        }
                    } catch (err) {
                        console.error('❌ Lỗi khi đọc thư mục dữ liệu:', err);
                    }

                    console.log(
                        `[CRON] Cập nhật dữ liệu lượng khách ${hotel.id} thành công`,
                    );
                    console.log(
                        '--------------------------------------------------',
                    );

                    console.log(
                        `[CRON] Bắt đầu training models của khách sạn ${hotel.id}`,
                    );
                    console.log(
                        '--------------------------------------------------',
                    );

                    await trainModelService({ hotelId: hotel.id });

                    console.log(
                        `[CRON] Hoàn thành training models của khách sạn ${hotel.id}`,
                    );
                    console.log(
                        '--------------------------------------------------',
                    );
                }
            }

            console.log(
                '[CRON] Cập nhật dữ liệu và models các khách sạn thành công',
            );
            console.log('--------------------------------------------------');
        },
        {
            timezone: 'Asia/Ho_Chi_Minh',
        },
    );
};
