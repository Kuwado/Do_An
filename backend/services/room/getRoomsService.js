import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from './roomAvailable.js';

export const getRoomsService = async ({
    roomTypeId = '',
    number = '',
    checkIn = '',
    checkOut = '',
    filter = '', // booked, available, maintenance, active
    page = 1,
    limit = '',
}) => {
    const whereClause = { room_type_id: roomTypeId };
    if (number) {
        whereClause.room_number = { [Op.substring]: number };
    }
    if (filter === 'active') {
        whereClause.status = 'active';
    } else if (filter === 'maintenance') {
        whereClause.status = 'maintenance';
    }

    const options = {
        where: whereClause,
    };

    if (limit && limit !== null && limit !== undefined) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    const roomInstances = await models.Room.findAll(options);

    let rooms = roomInstances.map((rt) => rt.toJSON());

    // Tính toán số lượng phòng và phòng trống
    if (checkIn && checkOut) {
        checkIn = formatCheckIn(checkIn);
        checkOut = formatCheckOut(checkOut);

        for (const room of rooms) {
            const available = await isRoomAvailable(room.id, checkIn, checkOut);
            room.isBooked = !available;
        }

        if (filter === 'booked') {
            rooms = rooms.filter((room) => room.isBooked);
        } else if (filter === 'available') {
            rooms = rooms.filter(
                (room) => !room.isBooked && room.status === 'active',
            );
        }
    }

    const count = rooms.length || 0;

    return {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        rooms: rooms,
    };
};
