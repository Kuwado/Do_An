'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('amenities', [
        // Bathroom
        { name: 'Vòi sen', category: 'bathroom' },
        { name: 'Bồn tắm', category: 'bathroom' },
        { name: 'Máy sấy tóc', category: 'bathroom' },
        { name: 'Khăn tắm', category: 'bathroom' },
        { name: 'Bồn rửa mặt', category: 'bathroom' },

        // View
        { name: 'View biển', category: 'view' },
        { name: 'View núi', category: 'view' },
        { name: 'View thành phố', category: 'view' },
        { name: 'View vườn', category: 'view' },
        { name: 'View hồ bơi', category: 'view' },

        // General
        { name: 'Wi-Fi miễn phí', category: 'general' },
        { name: 'Bữa sáng miễn phí', category: 'general' },
        { name: 'Bãi đậu xe miễn phí', category: 'general' },
        { name: 'Thang máy', category: 'general' },
        { name: 'Tiện nghi phòng tập', category: 'general' },
    ]);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('amenities', null, {});
}
