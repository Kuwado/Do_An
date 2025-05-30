import cron from 'node-cron';
import models from '../models/index.js';
import { Op } from 'sequelize';
import { readFile } from 'fs/promises';
import { readdir } from 'fs/promises';
import { appendFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import { Solar } from 'lunar-javascript';
import fs from 'fs/promises';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

dotenv.config();

export const collectData = async () => {
    // cron.schedule('*/5 * * * *', async () => {
    console.log('--------------------------------------------------');
    console.log(
        '[CRON] Bắt đầu thu thập dữ liệu lượng khách trong ngày vừa qua',
    );

    const hotels = await models.Hotel.findAll({ where: { predict: true } });
    if (hotels.length > 0) {
        // Lấy ngày hôm qua
        const today = new Date();
        const prevDay = new Date(today);
        prevDay.setDate(today.getDate() - 1);
        const yesterday = prevDay.toISOString().slice(0, 10);
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
        const dayOfWeek = daysOfWeek[prevDay.getDay()];
        console.log(yesterday);
        console.log(dayOfWeek);

        // Lấy lịch âm
        const year = prevDay.getFullYear();
        // Lấy tháng
        const month = prevDay.getMonth() + 1;
        const day = prevDay.getDate();
        const solar = Solar.fromYmd(year, month, day);
        const lunar = solar.getLunar();
        console.log(
            `Ngày âm của hôm qua: ${lunar.getDay()}/${lunar.getMonth()}`,
        );
        console.log(day);
        console.log(month);

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
        console.log(lunarHolidays);
        console.log(solarHolidays);

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
            let guest = 0;
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
                    check_in: { [Op.lte]: prevDay },
                    check_out: { [Op.gte]: prevDay },
                },
            });

            if (bookings.length > 0) {
                for (const booking of bookings) {
                    guest += booking.room.room_type.capacity;
                }
            }

            // Lấy thông tin thời tiết và nhiệt độ
            const res = await getWeather({ lat: hotel.lat, lon: hotel.lon });
            console.log(res);
            const weather = res.weather[0].main;
            const unRoundedtemp = res.main.temp - 273.15;
            const temp = Number(unRoundedtemp.toFixed(1));
            console.log(weather);
            console.log(temp);

            // Kiểm tra voucher hoạt động không
            const voucher = await models.Voucher.findOne({
                where: {
                    hotel_id: hotel.id,
                    start_date: { [Op.lte]: prevDay },
                    end_date: { [Op.gte]: prevDay },
                },
            });

            console.log(voucher);

            const voucherActive = voucher ? '1' : '0';

            // Tìm file csv
            const dataDir = path.join(__dirname, '../data'); // Đường dẫn thư mục chứa file CSV
            const targetFileName = `data_${hotel.id}_test_2.csv`;

            let dataFilePath;

            try {
                const files = await readdir(dataDir);
                const matchedFile = files.find(
                    (file) => file === targetFileName,
                );

                if (matchedFile) {
                    dataFilePath = path.join(dataDir, matchedFile);
                } else {
                    dataFilePath = path.join(dataDir, `model_${hotel.id}.csv`);
                }

                const header =
                    'Date,Lunar_date,Day_of_week,Month,Is_holiday,Weather_condition,Temperature,Voucher_active,Number_of_guests\n';
                const newRow = `${yesterday},${lunar.getDay()}/${lunar.getMonth()},${dayOfWeek},${month},${isHoliday},${weather},${temp},${voucherActive},${guest}\n`;

                try {
                    // Kiểm tra file có tồn tại không
                    await fs.access(dataFilePath).catch(async () => {
                        // File chưa tồn tại -> tạo file mới với header
                        await fs.writeFile(dataFilePath, header, 'utf8');
                    });

                    // Append dòng mới
                    await fs.appendFile(dataFilePath, newRow, 'utf8');
                    console.log(
                        `✅ Đã thêm dòng vào ${path.basename(dataFilePath)}`,
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
        }
    }

    // });
};

async function getWeather({ lat = 25.007858, lon = 65.845245 }) {
    const appid = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    lat,
                    lon,
                    appid,
                    lang: 'vi',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
}

// export const updateData = async (
//     inputPath = './data/data_1.csv',
//     outputPath = './data/data_1_new.csv',
// ) => {
//     // Xác định đường dẫn tuyệt đối
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = dirname(__filename);

//     const lunarFilePath = join(
//         __dirname,
//         '../data/holidays/lunar_holidays.json',
//     );
//     const solarFilePath = join(
//         __dirname,
//         '../data/holidays/solar_holidays.json',
//     );

//     // Đọc và parse 2 file JSON ngày lễ
//     const lunarJsonString = await readFile(lunarFilePath, 'utf8');
//     const solarJsonString = await readFile(solarFilePath, 'utf8');
//     const lunarHolidays = JSON.parse(lunarJsonString);
//     const solarHolidays = JSON.parse(solarJsonString);

//     const rows = [];

//     // Đọc CSV
//     await new Promise((resolve, reject) => {
//         fs.createReadStream(inputPath)
//             .pipe(csv())
//             .on('data', (row) => {
//                 const dateStr = row.Date;

//                 if (
//                     !dateStr ||
//                     typeof dateStr !== 'string' ||
//                     !dateStr.includes('-')
//                 ) {
//                     console.warn('⚠️ Dòng thiếu hoặc sai định dạng ngày:', row);
//                     return;
//                 }

//                 const [year, month, day] = dateStr.split('-').map(Number);
//                 const solar = Solar.fromYmd(year, month, day);
//                 const lunar = solar.getLunar();
//                 const lunarDay = lunar.getDay();
//                 const lunarMonth = lunar.getMonth();
//                 const lunarDate = `${lunarDay}/${lunarMonth}`;
//                 row.Lunar_date = lunarDate;

//                 // Kiểm tra ngày âm có trong danh sách lễ âm
//                 const isLunarHoliday = lunarHolidays.some(
//                     (h) => h.day === lunarDay && h.month === lunarMonth,
//                 );

//                 // Kiểm tra ngày dương có trong danh sách lễ dương
//                 const isSolarHoliday = solarHolidays.some(
//                     (h) => h.day === day && h.month === month,
//                 );

//                 row.Is_holiday = isLunarHoliday || isSolarHoliday ? '1' : '0';

//                 rows.push(row);
//             })
//             .on('end', resolve)
//             .on('error', reject);
//     });

//     if (rows.length === 0) {
//         console.warn('❗ Không có dòng dữ liệu nào để ghi.');
//         return;
//     }

//     // Ghi lại file CSV mới
//     const headers = Object.keys(rows[0]).map((key) => ({
//         id: key,
//         title: key,
//     }));

//     const csvWriter = createObjectCsvWriter({
//         path: outputPath,
//         header: headers,
//     });

//     await csvWriter.writeRecords(rows);
//     console.log('✅ Đã cập nhật file CSV:', outputPath);
// };
