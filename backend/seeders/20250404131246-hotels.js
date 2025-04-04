'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hotels', [
        {
            name: 'Khách sạn Mặt Trời',
            avatar: null,
            images: null,
            description: 'Khách sạn sang trọng gần bãi biển.',
            address: '123 Đường Biển, Quận 1',
            city: 'Đà Nẵng',
            phone: '0123456789',
            email: 'sunhotel@example.com',
            rating: 4.5,
        },
        {
            name: 'Khách sạn Ánh Trăng',
            avatar: null,
            images: null,
            description: 'Phù hợp cho kỳ nghỉ cuối tuần.',
            address: '456 Đường Núi, Quận 3',
            city: 'Đà Lạt',
            phone: '0987654321',
            email: 'moonhotel@example.com',
            rating: 4.2,
        },
        {
            name: 'Khách sạn Sông Xanh',
            avatar: null,
            images: null,
            description: 'View sông tuyệt đẹp, gần trung tâm.',
            address: '789 Đường Sông, Quận 5',
            city: 'Huế',
            phone: '0911223344',
            email: 'riverhotel@example.com',
            rating: 4.0,
        },
        {
            name: 'Khách sạn Núi Vàng',
            avatar: null,
            images: null,
            description: 'Ẩn mình giữa thiên nhiên hùng vĩ.',
            address: '222 Đường Rừng, Huyện Lâm Đồng',
            city: 'Đà Lạt',
            phone: '0988111222',
            email: 'goldenmountain@example.com',
            rating: 3.8,
        },
        {
            name: 'Khách sạn Hồ Gươm',
            avatar: null,
            images: null,
            description: 'Nằm ngay trung tâm Hà Nội, tiện nghi hiện đại.',
            address: '12 Lê Thái Tổ, Hoàn Kiếm',
            city: 'Hà Nội',
            phone: '0909123456',
            email: 'hoguomhotel@example.com',
            rating: 4.7,
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hotels', null, {});
}
