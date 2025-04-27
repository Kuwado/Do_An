'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const serviceTemplates = [
        {
            name: 'Buffet sáng',
            images: null,
            description: 'Buffet sáng với hơn 50 món Á - Âu đa dạng.',
            category: 'dining',
            price: 200000,
            hotel_id: 1,
        },
        {
            name: 'Ăn tối tự chọn',
            images: null,
            description: 'Thực đơn tối tự chọn với các món đặc sản vùng miền.',
            category: 'dining',
            price: 350000,
            hotel_id: 1,
        },
        {
            name: 'Set menu trưa',
            images: null,
            description: 'Set menu tiết kiệm với 3 món cho buổi trưa.',
            category: 'dining',
            price: 150000,
            hotel_id: 2,
        },
        {
            name: 'Xe Đưa Đón Sân Bay',
            images: null,
            description:
                'Dịch vụ đưa đón khách từ sân bay về khách sạn và ngược lại.',
            category: 'facilities',
            price: 500000,
            hotel_id: 1,
        },
        {
            name: 'Hồ bơi ngoài trời',
            images: null,
            description:
                'Hồ bơi rộng 500m2, có khu vực dành cho trẻ em và người lớn. Miễn phí khăn tắm và ghế nằm.',
            category: 'entertainment',
            price: 150000,
            hotel_id: 3,
        },
    ];

    const hotels = await queryInterface.sequelize.query(
        'SELECT id FROM hotels;',
        { type: Sequelize.QueryTypes.SELECT },
    );

    const servicesToInsert = [];

    for (const hotel of hotels) {
        for (const template of serviceTemplates) {
            servicesToInsert.push({
                name: template.name,
                images: template.images,
                description: template.description,
                category: template.category,
                price: template.price,
                hotel_id: hotel.id,
            });
        }
    }

    await queryInterface.bulkInsert('services', servicesToInsert);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
}
