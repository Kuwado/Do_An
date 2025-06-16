import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from './roomAvailable.js';

export const getRoomTypeService = async ({
    id,
    checkIn,
    checkOut,
    rooms = false,
}) => {
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

    let roomTypeInstance = await models.RoomType.findByPk(id, {
        include,
    });

    if (!roomTypeInstance) {
        throw new Error(`Loại phòng với id là ${id} không tồn tại`);
    }

    const roomType = roomTypeInstance.toJSON();

    if (roomType.images) {
        roomType.images = JSON.parse(roomType.images);
    }

    const amenityIds = roomType.amenities.map((a) => a.id);
    roomType.amenity_ids = amenityIds;

    // Phân nhóm amenities theo category
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

    // Tính toán số lượng phòng và phòng trống
    const roomList = await models.Room.findAll({
        where: { room_type_id: roomType.id },
    });

    roomType.total_rooms = roomList.length;

    if (checkIn && checkOut) {
        checkIn = formatCheckIn(checkIn);
        checkOut = formatCheckOut(checkOut);
        let availableRooms = 0;
        for (const room of roomList) {
            const available = await isRoomAvailable(room.id, checkIn, checkOut);
            if (available) {
                availableRooms++;
            }
        }

        roomType.available_rooms = availableRooms;
    }

    return roomType;
};
