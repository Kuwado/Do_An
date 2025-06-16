import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getReviewsService = async ({ hotelId, page = 1, limit = '' }) => {
    const whereClause = {};
    whereClause.hotel_id = hotelId;

    const include = [];
    include.push({
        model: models.User,
        as: 'user',
    });

    const options = {
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        distinct: true,
        order: [['created_at', 'DESC']],
    };

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.Review.findAndCountAll(options);

    const reviews = rows;
    reviews.total = count;

    return {
        message: `Lấy thành công danh sách các ddánh giá về khách sạn ${hotelId}`,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        reviews,
    };
};
