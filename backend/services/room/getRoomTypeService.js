import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from '../room/isRoomAvailable.js';

export const getRoomTypeService = async (id, checkIn, checkOut) => {
    let roomTypeInstance = await models.RoomType.findByPk(id, {
        include: {
            model: models.Amenity,
            as: 'amenities',
            through: {
                attributes: [],
            },
        },
    });

    if (!roomTypeInstance) {
        throw new Error(`Loại phòng với id là ${id} không tồn tại`);
    }

    const roomType = roomTypeInstance.toJSON();

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
    let total_rooms = 0;
    let available_rooms = 0;

    const rooms = await models.Room.findAll({
        where: { room_type_id: roomType.id },
    });

    roomType.total_rooms = rooms.length;

    checkIn = formatCheckIn(checkIn);
    checkOut = formatCheckOut(checkOut);
    let availableRooms = 0;
    for (const room of rooms) {
        const available = await isRoomAvailable(room.id, checkIn, checkOut);
        if (available) {
            availableRooms++;
        }
    }

    roomType.available_rooms = availableRooms;

    return {
        message: 'Lấy thành công thông tin loại phòng',
        room_type: roomType,
    };
};
