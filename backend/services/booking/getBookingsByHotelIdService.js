import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getBookingsByHotelIdService = async ({
    hotelId = '',
    name = '',
    status = '',
    sortDate = '',
    page = 1,
    limit = '',
}) => {
    const whereClause = {};
    whereClause.hotel_id = hotelId;
    if (status) {
        whereClause.status = status;
    }

    const include = [];

    const userInclude = {
        model: models.User,
        as: 'user',
    };
    if (name) {
        userInclude.where = {
            [Op.or]: [
                { first_name: { [Op.substring]: name } },
                { last_name: { [Op.substring]: name } },
            ],
        };
    }

    include.push(userInclude);
    include.push({
        model: models.Room,
        as: 'room',
        include: [
            {
                model: models.RoomType,
                as: 'room_type',
            },
        ],
    });

    const options = {
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        distinct: true,
    };

    if (sortDate === 'asc' || sortDate === 'desc') {
        options.order = [['check_in', sortDate]];
    } else if (sortDate === 'newest') {
        options.order = [['created_at', 'DESC']];
    }

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.Booking.findAndCountAll(options);

    const bookings = rows.map((rt) => rt.toJSON());

    return {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        bookings,
    };
};
