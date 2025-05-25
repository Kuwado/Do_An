import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getServiceBookingsByHotelIdService = async ({
    hotelId = '',
    name = '',
    status = '',
    sortDate = '',
    page = 1,
    limit = 10,
}) => {
    const whereClause = {};

    // Lọc theo trạng thái nếu có
    if (status) {
        whereClause.status = status;
    }

    // Cấu hình include
    const include = [
        {
            model: models.Booking,
            as: 'booking',
            required: true,
            where: { hotel_id: hotelId },
            include: [
                {
                    model: models.User,
                    as: 'user',
                    required: !!name,
                    where: name
                        ? {
                              [Op.or]: [
                                  { first_name: { [Op.substring]: name } },
                                  { last_name: { [Op.substring]: name } },
                              ],
                          }
                        : undefined,
                },
            ],
        },
        {
            model: models.Service,
            as: 'service',
        },
    ];

    const options = {
        where: whereClause,
        include,
        distinct: true,
    };

    // Sắp xếp theo ngày
    if (sortDate === 'asc' || sortDate === 'desc') {
        options.order = [['date', sortDate]];
    }

    // Phân trang
    if (limit) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.ServiceBooking.findAndCountAll(
        options,
    );

    return {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        service_bookings: rows,
    };
};
