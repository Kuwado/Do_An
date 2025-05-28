'use strict';
import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const bookings = await models.Booking.findAll();

    for (const booking of bookings) {
        const serviceAmount = await models.ServiceBooking.sum('final_amount', {
            where: { booking_id: booking.id, status: 'confirmed' },
        });

        const service_amount = serviceAmount || 0;
        const room_amount = parseFloat(booking.room_amount) || 0;

        await models.Booking.update(
            {
                service_amount: service_amount,
                total_amount: service_amount + room_amount,
            },
            {
                where: { id: booking.id },
            },
        );
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
