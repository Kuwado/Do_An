'use strict';
import { Op } from 'sequelize';
import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const hotels = await models.Hotel.findAll();

    const revenues = [];
    const now = new Date();
    hotels.forEach((hotel) => {
        const hotelId = hotel.id;

        // DAILY: 7 ngày gần nhất
        for (let i = 0; i < 7; i++) {
            const reportDate = new Date(now);
            reportDate.setDate(now.getDate() - i);

            revenues.push({
                hotel_id: hotelId,
                revenue: Math.floor(Math.random() * 5000 + 500) * 1000, // 500,000 ~ 5,500,000 VND
                report_date: reportDate.toISOString().split('T')[0],
                type: 'daily',
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        // MONTHLY: 6 tháng gần nhất
        for (let i = 0; i < 6; i++) {
            const reportDate = new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1,
            );

            revenues.push({
                hotel_id: hotelId,
                revenue: Math.floor(Math.random() * 100000 + 10000) * 1000, // 10,000,000 ~ 110,000,000 VND
                report_date: reportDate.toISOString().split('T')[0],
                type: 'monthly',
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        // YEARLY: 3 năm gần nhất
        for (let i = 0; i < 3; i++) {
            const reportDate = new Date(now.getFullYear() - i, 0, 1);

            revenues.push({
                hotel_id: hotelId,
                revenue: Math.floor(Math.random() * 1000000 + 500000) * 1000, // 500,000,000 ~ 1,500,000,000 VND
                report_date: reportDate.toISOString().split('T')[0],
                type: 'yearly',
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
    });

    await queryInterface.bulkInsert('revenues', revenues);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('revenues', {
        type: {
            [Op.in]: ['daily', 'monthly', 'yearly'],
        },
    });
}
