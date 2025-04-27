'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const hotels = await queryInterface.sequelize.query(
        'SELECT id FROM hotels;',
        { type: Sequelize.QueryTypes.SELECT },
    );

    const roomTypes = [];

    for (const hotel of hotels) {
        roomTypes.push(
            {
                name: 'Phòng Đơn Tiêu Chuẩn',
                description:
                    'Phòng tiêu chuẩn đầy đủ tiện nghi, phù hợp cho 2 người.',
                images: null,
                price: 350000,
                capacity: 1,
                area: 15.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Đôi Tiêu Chuẩn',
                description:
                    'Phòng tiêu chuẩn đầy đủ tiện nghi, phù hợp cho 2 người.',
                images: null,
                price: 500000,
                capacity: 2,
                area: 20.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Deluxe',
                description: 'Phòng Deluxe rộng rãi, view thành phố tuyệt đẹp.',
                images: null,
                price: 1000000,
                capacity: 3,
                area: 30.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Suite Cao Cấp',
                description: 'Phòng Suite đẳng cấp với phòng khách riêng biệt.',
                images: null,
                price: 2000000,
                capacity: 4,
                area: 50.0,
                hotel_id: hotel.id,
            },
        );
    }

    await queryInterface.bulkInsert('room_types', roomTypes, {});
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room_types', null, {});
}
