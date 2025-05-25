import models from '../../models/index.js';
import { Op } from 'sequelize';

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
        required: false,
        where: {
            status: 'confirmed',
        },
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

    booking.service_bookings.sort((a, b) => {
        // So sánh theo service.name trước
        const nameCompare = a.service.name.localeCompare(b.service.name);
        if (nameCompare !== 0) return nameCompare;

        // Nếu tên giống nhau thì so sánh theo date
        return new Date(a.date) - new Date(b.date);
    });

    const bookedCount = await models.Booking.findAll({
        where: {
            user_id: booking.user_id,
            hotel_id: booking.hotel_id,
            status: {
                [Op.or]: ['confirmed', 'completed'],
            },
        },
    });

    booking.user.booked_count = bookedCount.length || 0;

    const bookedCountAll = await models.Booking.findAll({
        where: {
            user_id: booking.user_id,
            status: {
                [Op.or]: ['confirmed', 'completed'],
            },
        },
    });

    booking.user.booked_count_all = bookedCountAll.length || 0;

    return booking;
};
