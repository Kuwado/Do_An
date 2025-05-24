import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getAllServicesByHotelIdService = async ({
    hotelId = '',
    name = '',
    category = '',
    sortPrice = '',
    page = 1,
    limit = '',
}) => {
    const whereClause = {};
    whereClause.hotel_id = hotelId;
    if (name) {
        whereClause.name = { [Op.substring]: name };
    }
    if (category) {
        whereClause.category = category;
    }

    const options = {
        where: whereClause,
        distinct: true,
    };

    if (sortPrice === 'asc' || sortPrice === 'desc') {
        options.order = [['price', sortPrice]];
    }

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.Service.findAndCountAll(options);

    const services = rows.map((rt) => rt.toJSON());

    const start = new Date();
    start.setHours(0, 0, 0, 0); // 00:00:00

    const end = new Date();
    end.setHours(23, 59, 59, 999); // 23:59:59

    for (const service of services) {
        const serviceBookings = await models.ServiceBooking.findAll({
            where: {
                service_id: service.id,
                date: {
                    [Op.between]: [start, end],
                },
                status: {
                    [Op.in]: ['pending', 'confirmed'],
                },
            },
        });
        service.total_bookings = serviceBookings.length || 0;
    }

    return {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        services,
    };
};
