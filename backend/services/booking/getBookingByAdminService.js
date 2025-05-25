import models from '../../models/index.js';

export const getBookingByAdminService = async ({ id = '' }) => {
    const include = [];

    include.push({
        model: models.User,
        as: 'user',
    });

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

    include.push({
        model: models.ServiceBooking,
        as: 'service_bookings',
        include: [
            {
                model: models.Service,
                as: 'service',
            },
        ],
    });

    include.push({
        model: models.Voucher,
        as: 'voucher',
    });

    let bookingInstance = await models.Booking.findByPk(id, {
        include: include.length > 0 ? include : undefined,
    });

    if (!bookingInstance) {
        throw new Error(`Booking với id là ${id} không tồn tại`);
    }

    const booking = bookingInstance.toJSON();

    const bookedCount = await models.Booking.findAll({
        where: { user_id: booking.user_id, hotel_id: booking.hotel_id },
    });

    booking.user.booked_count = bookedCount.length || 0;

    return booking;
};
