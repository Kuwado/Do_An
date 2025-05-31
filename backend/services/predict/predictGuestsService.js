import models from '../../models/index.js';
import { Op } from 'sequelize';

import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Solar } from 'lunar-javascript';
import { getWeatherService } from './getWeatherService.js';

dotenv.config();
const apiUrl = process.env.ML_API;

export const predictGuestsService = async ({ hotelId = 1 }) => {
    console.log(hotelId);
    const hotel = await models.Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error(`Khách sạn với id là ${hotelId} không tồn tại`);
    }

    if (!hotel.predict) {
        throw new Error(`Khách sạn với id là ${hotelId} chưa mở dự đoán`);
    }

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

    // Lấy lịch âm
    const year = today.getFullYear();
    // Lấy tháng
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();

    // Lấy danh sách ngày lễ âm và dương lịch
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const lunarFilePath = join(
        __dirname,
        '../../data/holidays/lunar_holidays.json',
    );
    const solarFilePath = join(
        __dirname,
        '../../data/holidays/solar_holidays.json',
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

    // Lấy thông tin thời tiết và nhiệt độ
    const res = await getWeatherService({
        lat: hotel.lat,
        lon: hotel.lon,
    });
    const weather = res.weather[0].main;
    const unRoundedtemp = res.main.temp - 273.15;
    const temp = Number(unRoundedtemp.toFixed(1));

    // Kiểm tra voucher hoạt động không
    const voucher = await models.Voucher.findOne({
        where: {
            hotel_id: hotel.id,
            start_date: { [Op.lte]: today },
            end_date: { [Op.gte]: today },
        },
    });

    const voucherActive = voucher ? '1' : '0';

    try {
        const input = {
            date: currentDay,
            lunar_date: lunarDate,
            day_of_week: dayOfWeek,
            month: month,
            is_holiday: isHoliday,
            weather_condition: weather,
            temperature: temp,
            voucher_active: voucherActive,
        };

        const response = await axios.post(`${apiUrl}/predict/${hotelId}`, {
            input,
        });

        const predicts = response.data;
        if (predicts.random_forest === 'Model not found') {
            throw new Error(
                `Khách sạn với id là ${hotelId} chưa được huấn luyện model Random_Forest. Vui lòng thử lại sau`,
            );
        }
        if (predicts.xgboost === 'Model not found') {
            throw new Error(
                `Khách sạn với id là ${hotelId} chưa được huấn luyện model XGBoost. Vui lòng thử lại sau`,
            );
        }
        if (predicts.sarima === 'Model not found') {
            throw new Error(
                `Khách sạn với id là ${hotelId} chưa được huấn luyện model Sarima. Vui lòng thử lại sau`,
            );
        }

        const predictedData = await models.Predict.findOne({
            where: {
                hotel_id: hotelId,
                date: currentDay,
            },
        });

        if (!predictedData) {
            await models.Predict.create({
                hotel_id: hotelId,
                date: currentDay,
                predicted_guests: predicts.avg,
            });
        }

        return {
            predicts,
            weather,
            temp,
            icon: res.weather[0].icon,
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
};
