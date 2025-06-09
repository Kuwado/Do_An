import models from '../../models/index.js';

export const getBookingService = async ({
    id = '',
    user = true,
    hotel = true,
    room = true,
    services = true,
    voucher = true,
    review = true,
}) => {
    const include = [];

    if (user) {
        include.push({
            model: models.User,
            as: 'user',
        });
    }
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
    if (services) {
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
    }
    if (voucher) {
        include.push({
            model: models.Voucher,
            as: 'voucher',
        });
    }
    if (review) {
        include.push({
            model: models.Review,
            as: 'review',
        });
    }

    let bookingInstance = await models.Booking.findByPk(id, {
        include: include.length > 0 ? include : undefined,
    });

    const booking = bookingInstance.toJSON();

    // Phân nhóm services theo category
    if (services) {
        const groupedServices = {
            dining: [],
            entertainment: [],
            facilities: [],
        };

        booking.service_bookings.forEach((sb) => {
            if (groupedServices[sb.service.category]) {
                groupedServices[sb.service.category].push(sb);
            }
        });

        booking.total_services = booking.service_bookings.length;
        booking.service_bookings = groupedServices;
    }

    if (booking.room.room_type.images) {
        booking.room.room_type.images = JSON.parse(
            booking.room.room_type.images,
        );
    }

    return booking;
};
