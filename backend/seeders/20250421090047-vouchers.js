'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vouchers', [
        {
            code: 'WELCOME10',
            type: 'room',
            name: 'Giảm 10% cho khách hàng mới',
            description: 'Giảm 10% cho khách hàng mới lần đầu đặt phòng',
            discount: 10,
            discount_type: 'percent',
            start_date: '2025-04-01',
            end_date: '2025-07-20',
            status: 'active',
            hotel_id: null,
        },
        {
            code: 'WELCOME5',
            type: 'room',
            name: 'Giảm 5% cho khách hàng mới',
            description: 'Giảm 5% cho khách hàng mới lần đầu đặt phòng',
            discount: 5,
            discount_type: 'percent',
            start_date: '2025-04-01',
            end_date: '2025-07-20',
            status: 'active',
            hotel_id: null,
        },
        {
            code: 'WELCOMESV',
            type: 'service',
            name: 'Giảm 10% dịch vụ cho khách hàng mới',
            description:
                'Giảm 10% dịch vụ cho khách hàng mới lần đầu đặt phòng',
            discount: 10,
            discount_type: 'percent',
            start_date: '2025-04-01',
            end_date: '2025-07-20',
            status: 'active',
            hotel_id: null,
        },
        {
            code: 'WELCOME500K',
            type: 'room',
            name: 'Giảm 500k cho khách hàng mới',
            description: 'Giảm 500k cho khách hàng mới lần đầu đặt phòng',
            discount: 500000,
            discount_type: 'fixed',
            start_date: '2025-04-01',
            end_date: '2025-07-20',
            status: 'active',
            hotel_id: null,
        },
        {
            code: 'WELCOME200K',
            type: 'room',
            name: 'Giảm 200K cho khách hàng mới',
            description: 'Giảm 200K cho khách hàng mới lần đầu đặt phòng',
            discount: 200000,
            discount_type: 'fixed',
            start_date: '2025-04-01',
            end_date: '2025-07-20',
            status: 'active',
            hotel_id: null,
        },
        {
            code: 'SPRING50',
            type: 'service',
            name: 'Giảm 50k cho dịch vụ',
            description: 'Giảm 50k cho dịch vụ nha nha',
            discount: 50000,
            discount_type: 'fixed',
            start_date: '2025-03-01',
            end_date: '2025-07-25',
            status: 'active',
            hotel_id: 1,
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vouchers', null, {});
}
