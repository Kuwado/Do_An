import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from './roomAvailable.js';

export const getRoomTypesService = async ({
    hotelId,
    name = '',
    checkIn = '',
    checkOut = '',
    rooms = false,
    page = 1,
    limit = '',
}) => {
    const whereClause = {};
    whereClause.hotel_id = hotelId;
    if (name) {
        whereClause.name = { [Op.substring]: name };
    }

    const include = [];
    include.push({
        model: models.Amenity,
        as: 'amenities',
        through: {
            attributes: [],
        },
    });

    if (rooms) {
        include.push({
            model: models.Room,
            as: 'rooms',
        });
    }

    const options = {
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        distinct: true,
    };

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const { count, rows } = await models.RoomType.findAndCountAll(options);

    const roomTypes = rows.map((rt) => rt.toJSON());

    // Phân nhóm amenities theo category
    for (const roomType of roomTypes) {
        const groupedAmenities = {
            bathroom: [],
            view: [],
            general: [],
        };

        if (Array.isArray(roomType.amenities)) {
            roomType.amenities.forEach((a) => {
                if (groupedAmenities[a.category]) {
                    groupedAmenities[a.category].push(a);
                }
            });
        }

        roomType.amenities = groupedAmenities;
    }

    // Tính toán số lượng phòng và phòng trống
    let total_rooms = 0;
    let available_rooms = 0;

    for (const rt of roomTypes) {
        const rooms = await models.Room.findAll({
            where: { room_type_id: rt.id },
        });

        rt.total_rooms = rooms.length;
        total_rooms += rooms.length;

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
        available_rooms += availableRooms;
    }

    roomTypes.total_rooms = total_rooms;
    roomTypes.available_rooms = available_rooms;

    return {
        message: 'Lấy thành công danh sách các loại phòng khách sạn',
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        room_types: roomTypes,
    };
};
