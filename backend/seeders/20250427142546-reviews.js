'use strict';

import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const commentsTemplate = [
        { rating: 1, comment: 'Rất tệ, không như mong đợi.' },
        { rating: 2, comment: 'Không hài lòng, dịch vụ chưa tốt.' },
        { rating: 3, comment: 'Khá ổn, nhưng có thể cải thiện.' },
        { rating: 4, comment: 'Tốt, tôi hài lòng với dịch vụ.' },
        { rating: 5, comment: 'Tuyệt vời, tôi rất hài lòng!' },
    ];

    const hotels = await models.Hotel.findAll();

    const users = await models.User.findAll();

    const reviews = [];

    // Lặp qua tất cả các khách sạn và người dùng để tạo bình luận
    hotels.forEach((hotel) => {
        users.forEach((user) => {
            // Random chọn một rating và comment từ template
            const randomIndex = Math.floor(
                Math.random() * commentsTemplate.length,
            );
            const randomComment = commentsTemplate[randomIndex];

            reviews.push({
                hotel_id: hotel.id,
                user_id: user.id,
                rating: randomComment.rating,
                comment: randomComment.comment,
                images: null,
                created_at: new Date(),
            });
        });
    });

    // Thêm tất cả các bình luận vào bảng reviews
    await queryInterface.bulkInsert('reviews', reviews);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
}
