import models from '../../models/index.js';

export const getBookingsByUserIdService = async ({
    userId = '',
    hotel = true,
    room = true,
    page = 1,
    limit = 10,
}) => {
    const include = [];

    if (hotel) {
        include.push({
            model: models.Hotel,
            as: 'hotel',
        });
    }
    if (room) {
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
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await models.Booking.findAndCountAll({
        include: include.length > 0 ? include : undefined,
        where: { user_id: userId },
        order: [['created_at', 'desc']],
        offset,
        limit,
    });

    const bookings = rows;

    if (!bookings || bookings.length === 0) {
        throw new Error(`Người dùng ${userId} chưa có booking nào`);
    }

    return {
        bookings,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
    };
};
