import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from '../room/roomAvailable.js';

export const getHotelService = async ({ id, checkIn, checkOut }) => {
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

    const amenityIds = hotel.amenities.map((a) => a.id);
    hotel.amenity_ids = amenityIds;

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

    // const bathroomIds = hotel.amenities.bathroom.map((a) => a.id);
    // const viewIds = hotel.amenities.view.map((a) => a.id);
    // const generalIds = hotel.amenities.general.map((a) => a.id);
    // hotel.bathroom_ids = bathroomIds;
    // hotel.view_ids = viewIds;
    // hotel.general_ids = generalIds;

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
    let active_rooms = 0;
    let maintenance_rooms = 0;
    let available = 0;

    for (const rt of hotel.room_types) {
        const rooms = await models.Room.findAll({
            where: { room_type_id: rt.id },
        });

        const activeRooms = await models.Room.findAll({
            where: { room_type_id: rt.id, status: 'active' },
        });

        const maintenanceRooms = await models.Room.findAll({
            where: { room_type_id: rt.id, status: 'maintenance' },
        });

        active_rooms += activeRooms.length;
        maintenance_rooms += maintenanceRooms.length;
        total += rooms.length;

        if (checkIn && checkOut) {
            checkIn = formatCheckIn(checkIn);
            checkOut = formatCheckOut(checkOut);
            let availableRooms = 0;
            for (const room of activeRooms) {
                const available = await isRoomAvailable(
                    room.id,
                    checkIn,
                    checkOut,
                );
                if (available) {
                    availableRooms++;
                }
            }

            available += availableRooms;
        }
    }

    hotel.total_room_types = hotel.room_types.length;
    hotel.total_rooms = total;
    hotel.active_rooms = active_rooms;
    hotel.maintenance_rooms = maintenance_rooms;
    hotel.available_rooms = available;

    hotel.total_reviews = hotel.reviews.length;
    hotel.images = JSON.parse(hotel.images);

    delete hotel.reviews;
    delete hotel.room_types;

    return hotel;
};
