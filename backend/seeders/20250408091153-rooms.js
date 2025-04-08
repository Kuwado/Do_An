'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const [roomTypes] = await queryInterface.sequelize.query(
        'SELECT id FROM room_types',
    );
    const rooms = [];

    const statuses = ['available', 'pending', 'booked', 'maintenance'];
    const usedRoomNumbers = new Set();

    const generateUniqueRoomNumber = () => {
        let number;
        do {
            number = 'R' + Math.floor(1000 + Math.random() * 9000);
        } while (usedRoomNumbers.has(number));
        usedRoomNumbers.add(number);
        return number;
    };

    for (const roomType of roomTypes) {
        for (let i = 0; i < 5; i++) {
            rooms.push({
                room_number: generateUniqueRoomNumber(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                room_type_id: roomType.id,
            });
        }
    }

    await queryInterface.bulkInsert('rooms', rooms, {});
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
}
