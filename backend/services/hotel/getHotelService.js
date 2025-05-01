import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from '../room/isRoomAvailable.js';

export const getHotelService = async (id, checkIn, checkOut) => {
    const include = [];

    include.push({
        model: models.Amenity,
        as: 'amenities',
        through: {
            attributes: [],
        },
    });

    include.push({
        model: models.RoomType,
        as: 'room_types',
    });

    include.push({
        model: models.Service,
        as: 'services',
    });

    include.push({
        model: models.Review,
        as: 'reviews',
    });

    let hotelInstance = await models.Hotel.findByPk(id, {
        include: include.length > 0 ? include : undefined,
    });

    if (!hotelInstance) {
        throw new Error(`Khách sạn với id là ${id} không tồn tại`);
    }

    const hotel = hotelInstance.toJSON();
    hotel.total_services = hotel.services.length;

    // Phân nhóm amenities theo category
    const groupedAmenities = {
        bathroom: [],
        view: [],
        general: [],
    };

    hotel.amenities.forEach((amenity) => {
        if (groupedAmenities[amenity.category]) {
            groupedAmenities[amenity.category].push(amenity);
        }
    });

    hotel.amenities = groupedAmenities;

    const groupedServices = {
        dining: [],
        entertainment: [],
        facilities: [],
    };

    hotel.services.forEach((service) => {
        if (groupedServices[service.category]) {
            groupedServices[service.category].push(service);
        }
    });

    hotel.services = groupedServices;

    // Tính toán số lượng phòng và phòng trống
    let total = 0;
    let available = 0;

    for (const rt of hotel.room_types) {
        const rooms = await models.Room.findAll({
            where: { room_type_id: rt.id },
        });

        rt.total_rooms = rooms.length;
        total += rooms.length;

        checkIn = formatCheckIn(checkIn);
        checkOut = formatCheckOut(checkOut);
        let availableRooms = 0;
        for (const room of rooms) {
            const available = await isRoomAvailable(room.id, checkIn, checkOut);
            if (available) {
                availableRooms++;
            }
        }

        rt.available_rooms = availableRooms;
        available += availableRooms;
    }

    hotel.total_room_types = hotel.room_types.length;
    hotel.total_rooms = total;
    hotel.available_rooms = available;

    hotel.total_reviews = hotel.reviews.length;

    return {
        message: 'Lấy thành công thông tin khách sạn',
        hotel: hotel,
    };
};
