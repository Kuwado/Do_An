import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getRoomTypeService = async ({
    hotelId,
    name = '',
    rooms = false,
    page = 1,
    limit = 10,
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

    const offset = (page - 1) * limit;

    const { count, rows } = await models.RoomType.findAndCountAll({
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        offset,
        limit,
        distinct: true,
    });

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

        const availableRooms = rooms.filter((r) => r.status === 'available');
        rt.available_rooms = availableRooms.length;
        available_rooms += availableRooms.length;
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
