import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getStaffsByHotelIdService = async ({
    hotelId = '',
    name = '',
    role = '',
    page = 1,
    limit = 10,
}) => {
    const hotel = await models.Hotel.findByPk(hotelId);
    if (!hotel) {
        throw new Error(`Khách sạn với ${hotelId} không tồn tại`);
    }

    const whereClause = { hotel_id: hotelId };
    if (name) {
        whereClause[Op.or] = [
            { first_name: { [Op.substring]: name } },
            { last_name: { [Op.substring]: name } },
        ];
    }
    if (role) {
        whereClause.role = { [Op.substring]: role };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await models.Staff.findAndCountAll({
        where: whereClause,
        order: [['first_name', 'asc']],
        offset,
        limit,
    });

    const staffs = rows;

    return {
        staffs,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
    };
};
