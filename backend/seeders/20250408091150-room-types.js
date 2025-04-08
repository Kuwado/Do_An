'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const [hotels] = await queryInterface.sequelize.query(
        'SELECT id FROM hotels',
    );
    const roomTypes = [];

    const roomTypeNames = ['Deluxe', 'Superior', 'Standard'];
    const now = new Date();

    for (const hotel of hotels) {
        for (let i = 0; i < 3; i++) {
            roomTypes.push({
                name: `${roomTypeNames[i]} Room - Hotel ${hotel.id}`,
                description: `${roomTypeNames[i]} Room Description`,
                price: (100 + i * 50).toFixed(2),
                capacity: 2 + i,
                area: 20 + i * 5,
                hotel_id: hotel.id,
            });
        }
    }

    await queryInterface.bulkInsert('room_types', roomTypes, {});
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room_types', null, {});
}
