import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getVouchersService = async ({
    hotelId = '',
    type = '',
    discountType = '',
    name = '',
    status = '',
    sortDate = '',
    page = 1,
    limit,
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
    if (name) {
        whereClause.name = { [Op.substring]: name };
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

    const options = {
        where: whereClause,
        distinct: true,
    };

    if (sortDate === 'asc' || sortDate === 'desc') {
        options.order = [['start_date', sortDate]];
    }

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.Voucher.findAndCountAll(options);

    const vouchers = rows.map((rt) => rt.toJSON());

    for (const voucher of vouchers) {
        const usedCount = await models.UserVoucher.findAll({
            where: { voucher_id: voucher.id },
        });

        voucher.used_count = usedCount.length || 0;
    }

    return {
        vouchers,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
    };
};
