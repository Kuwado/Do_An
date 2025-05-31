'use strict';
import models from '../models/index.js';

const hardCodedPredicts = [
    {
        hotel_id: 1,
        date: '2025-05-20',
        predicted_guests: 30,
        actual_guests: 28,
    },
    {
        hotel_id: 1,
        date: '2025-05-21',
        predicted_guests: 32,
        actual_guests: 34,
    },
    {
        hotel_id: 1,
        date: '2025-05-22',
        predicted_guests: 25,
        actual_guests: 22,
    },
    {
        hotel_id: 1,
        date: '2025-05-23',
        predicted_guests: 31,
        actual_guests: 25,
    },
    {
        hotel_id: 1,
        date: '2025-05-24',
        predicted_guests: 40,
        actual_guests: 39,
    },
    {
        hotel_id: 1,
        date: '2025-05-25',
        predicted_guests: 39,
        actual_guests: 39,
    },
    {
        hotel_id: 1,
        date: '2025-05-26',
        predicted_guests: 25,
        actual_guests: 23,
    },
    {
        hotel_id: 1,
        date: '2025-05-27',
        predicted_guests: 18,
        actual_guests: 20,
    },
    {
        hotel_id: 1,
        date: '2025-05-28',
        predicted_guests: 22,
        actual_guests: 23,
    },
    {
        hotel_id: 1,
        date: '2025-05-29',
        predicted_guests: 30,
        actual_guests: 29,
    },
    {
        hotel_id: 1,
        date: '2025-05-30',
        predicted_guests: 25,
        actual_guests: 28,
    },
];

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const hotels = await models.Hotel.findAll({
        where: { predict: true },
    });

    const startDate = new Date('2025-05-20');
    const endDate = new Date('2025-05-30');

    const predicts = [];

    for (const hotel of hotels) {
        const hotelId = hotel.id;

        for (
            let date = new Date(startDate);
            date <= endDate;
            date.setDate(date.getDate() + 1)
        ) {
            const formattedDate = date.toISOString().split('T')[0];

            if (hotelId === 1) {
                const hardData = hardCodedPredicts.find(
                    (p) => p.date === formattedDate,
                );
                if (hardData) predicts.push(hardData);
            } else {
                // Dữ liệu ngẫu nhiên cho hotel khác
                const predicted = Math.floor(Math.random() * 51);
                const deviation = Math.floor(Math.random() * 11) - 5; // số lệch từ -5 đến +5
                let actual = predicted + deviation;

                // Giới hạn actual từ 0 đến 50
                actual = Math.max(0, Math.min(50, actual));

                predicts.push({
                    hotel_id: hotelId,
                    date: formattedDate,
                    predicted_guests: predicted,
                    actual_guests: actual,
                });
            }
        }
    }

    if (predicts.length > 0) {
        await queryInterface.bulkInsert('predicts', predicts, {});
    }
}
export async function down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
}
