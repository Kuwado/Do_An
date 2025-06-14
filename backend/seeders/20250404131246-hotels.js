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
            city: 'Hà Nội',
            phone: '0123456789',
            email: 'sunhotel@example.com',
            min_price: 300000,
            rating: 4.5,
            predict: true,
            lat: 21.007858,
            lon: 105.845245,
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
            min_price: 300000,
            rating: 4.2,
            predict: true,
            lat: 21.007858,
            lon: 105.845245,
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
            min_price: 300000,
            rating: 4.0,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
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
            min_price: 300000,
            rating: 3.8,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
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
            min_price: 300000,
            rating: 4.7,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Biển Xanh',
            avatar: null,
            images: null,
            description: 'View biển đẹp, tiện nghi đầy đủ.',
            address: '85 Trần Phú, Nha Trang',
            city: 'Nha Trang',
            phone: '0909333444',
            email: 'bienxanh@example.com',
            min_price: 250000,
            rating: 4.5,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Sông Hàn',
            avatar: null,
            images: null,
            description: 'Gần cầu Rồng, trung tâm Đà Nẵng.',
            address: '10 Bạch Đằng, Hải Châu',
            city: 'Đà Nẵng',
            phone: '0909555666',
            email: 'songhanhotel@example.com',
            min_price: 280000,
            rating: 4.6,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Đồi Thông',
            avatar: null,
            images: null,
            description: 'Không gian yên tĩnh, mát mẻ tại Đà Lạt.',
            address: '3 Mai Anh Đào, Đà Lạt',
            city: 'Đà Lạt',
            phone: '0909888777',
            email: 'doithonghotel@example.com',
            min_price: 220000,
            rating: 4.4,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Sài Gòn Center',
            avatar: null,
            images: null,
            description: 'Ngay trung tâm quận 1, thuận tiện di chuyển.',
            address: '100 Lê Lai, Quận 1',
            city: 'TP. Hồ Chí Minh',
            phone: '0909222333',
            email: 'saigoncenter@example.com',
            min_price: 320000,
            rating: 4.8,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Cần Thơ Riverside',
            avatar: null,
            images: null,
            description: 'View sông đẹp, gần chợ nổi Cái Răng.',
            address: '22 Nguyễn Trãi, Ninh Kiều',
            city: 'Cần Thơ',
            phone: '0909666777',
            email: 'canthoriverside@example.com',
            min_price: 210000,
            rating: 4.3,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
        {
            name: 'Khách sạn Huế Imperial',
            avatar: null,
            images: null,
            description: 'Phong cách cổ kính, gần Đại Nội.',
            address: '15 Hùng Vương, TP. Huế',
            city: 'Huế',
            phone: '0909444555',
            email: 'hueimperial@example.com',
            min_price: 240000,
            rating: 4.5,
            predict: false,
            lat: 21.007858,
            lon: 105.845245,
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hotels', null, {});
}
