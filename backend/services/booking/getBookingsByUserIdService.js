import models from '../../models/index.js';

export const getBookingsByUserIdService = async ({
    userId = '',
    hotel = true,
    room = true,
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

    let bookings = await models.Booking.findAll({
        include: include.length > 0 ? include : undefined,
        where: { user_id: userId },
        order: [['created_at', 'desc']],
    });

    if (!bookings || bookings.length === 0) {
        throw new Error(`Người dùng ${userId} chưa có booking nào`);
    }

    return bookings;
};
