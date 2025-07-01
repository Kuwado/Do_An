'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const hotels = await queryInterface.sequelize.query(
        'SELECT id FROM hotels;',
        { type: Sequelize.QueryTypes.SELECT },
    );

    const roomTypes = [];
    const hotelMinPrices = {};

    for (const hotel of hotels) {
        const price1 = 200000 + Math.floor(Math.random() * 16) * 10000; // 200000 - 350000
        const price2 = 400000 + Math.floor(Math.random() * 11) * 10000; // 400000 - 500000
        const price3 = 800000 + Math.floor(Math.random() * 21) * 10000; // 800000 - 1000000
        const price4 = 1500000 + Math.floor(Math.random() * 11) * 10000; // 1500000 - 1600000

        const hotelRoomTypes = [
            {
                name: 'Phòng Đơn Tiêu Chuẩn',
                description:
                    'Phòng tiêu chuẩn đầy đủ tiện nghi, phù hợp cho 1 người.',
                images: null,
                price: price1,
                capacity: 1,
                area: 15.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Đôi Tiêu Chuẩn',
                description:
                    'Phòng tiêu chuẩn đầy đủ tiện nghi, phù hợp cho 2 người.',
                images: null,
                price: price2,
                capacity: 2,
                area: 20.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Deluxe',
                description: 'Phòng Deluxe rộng rãi, view thành phố tuyệt đẹp.',
                images: null,
                price: price3,
                capacity: 3,
                area: 30.0,
                hotel_id: hotel.id,
            },
            {
                name: 'Phòng Suite Cao Cấp',
                description: 'Phòng Suite đẳng cấp với phòng khách riêng biệt.',
                images: null,
                price: price4,
                capacity: 4,
                area: 50.0,
                hotel_id: hotel.id,
            },
        ];

        roomTypes.push(...hotelRoomTypes);

        const minPrice = Math.min(price1, price2, price3, price4);
        hotelMinPrices[hotel.id] = minPrice;
    }

    await queryInterface.bulkInsert('room_types', roomTypes, {});

    for (const [hotelId, minPrice] of Object.entries(hotelMinPrices)) {
        await queryInterface.bulkUpdate(
            'hotels',
            { min_price: minPrice },
            { id: hotelId },
        );
    }
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room_types', null, {});
    await queryInterface.bulkUpdate('hotels', { min_price: null }, {});
}
