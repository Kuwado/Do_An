import models from '../models/index.js';
import { Op } from 'sequelize';

export const getVouchersService = async ({
    hotelId = '',
    type = '',
    discountType = '',
    status = 'active',
    page = 1,
    limit = 10,
}) => {
    const whereClause = {};
    if (hotelId) {
        if (hotelId === 'all') {
            whereClause.hotel_id = null;
        } else whereClause.hotel_id = hotelId;
    }
    if (type) {
        whereClause.type = type;
    }
    if (discountType) {
        whereClause.discount_type = discountType;
    }

    if (status === 'active') {
        const now = new Date();
        whereClause.start_date = { [Op.lte]: now };
        whereClause.end_date = { [Op.gte]: now };
    } else if (status === 'soon') {
        const now = new Date();
        whereClause.start_date = { [Op.gte]: now };
    } else if (status === 'expired') {
        const now = new Date();
        whereClause.end_date = { [Op.lte]: now };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await models.Voucher.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        order: [['start_date', 'DESC']],
    });

    return {
        message: 'Lấy thành công danh sách Voucher',
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        vouchers: rows,
    };
};
