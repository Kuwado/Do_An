'use strict';
import { faker } from '@faker-js/faker';
import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const users = await models.User.findAll();
    const hotels = await models.Hotel.findAll();

    const bookings = [];

    for (const user of users) {
        for (const hotel of hotels) {
            const roomTypes = await models.RoomType.findAll({
                where: { hotel_id: hotel.id },
                include: [{ model: models.Room, as: 'rooms' }],
            });

            const availableRoomInfo = [];

            for (const rt of roomTypes) {
                if (rt.rooms.length > 0) {
                    for (const room of rt.rooms) {
                        availableRoomInfo.push({
                            room_id: room.id,
                            room_price: rt.price,
                        });
                    }
                }
            }

            if (availableRoomInfo.length === 0) continue;

            for (let i = 0; i < 2; i++) {
                const randomInfo =
                    faker.helpers.arrayElement(availableRoomInfo);

                const checkIn = faker.date.soon({ days: 30 });
                const checkOut = new Date(checkIn);
                checkOut.setDate(
                    checkOut.getDate() + faker.number.int({ min: 1, max: 5 }),
                );

                const numNights = Math.ceil(
                    (checkOut.getTime() - checkIn.getTime()) /
                        (1000 * 60 * 60 * 24),
                );

                const room_price = parseFloat(randomInfo.room_price);
                const total_price = room_price * numNights;

                const status = faker.helpers.arrayElement([
                    'pending',
                    'confirmed',
                    'using',
                ]);

                const booking = {
                    user_id: user.id,
                    hotel_id: hotel.id,
                    room_id: randomInfo.room_id,
                    room_price: randomInfo.room_price,
                    check_in: checkIn,
                    check_out: checkOut,
                    status: status,
                    total_room_price: total_price,
                    room_amount: total_price,
                };

                if (status === 'using') {
                    booking.checked_in_at = checkIn;
                }

                bookings.push(booking);
            }
        }
    }

    await queryInterface.bulkInsert('bookings', bookings);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
}
