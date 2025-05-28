'use strict';
import { faker } from '@faker-js/faker';
import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const bookings = await models.Booking.findAll();
    const allServiceBookings = [];

    for (const booking of bookings) {
        const hotelServices = await models.Service.findAll({
            where: { hotel_id: booking.hotel_id },
        });

        if (hotelServices.length < 2) continue;

        const randomServices = faker.helpers.arrayElements(hotelServices, 2);

        for (const service of randomServices) {
            const quantity = faker.number.int({ min: 1, max: 3 });

            // Random ngày trong khoảng check-in đến check-out
            const start = new Date(booking.check_in);
            const end = new Date(booking.check_out);
            const randomDate = faker.date.between({ from: start, to: end });

            const status = faker.helpers.arrayElement(['pending', 'confirmed']);

            allServiceBookings.push({
                booking_id: booking.id,
                service_id: service.id,
                quantity,
                price: service.price,
                final_amount: service.price * quantity,
                total_amount: service.price * quantity,
                date: randomDate,
                status,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
    }

    if (allServiceBookings.length > 0) {
        await queryInterface.bulkInsert('service_bookings', allServiceBookings);
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
