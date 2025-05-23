import models from '../../models/index.js';
import { Op } from 'sequelize';

/**
 * Kiểm tra xem phòng có booking trùng ngày không
 * @param {number} roomId
 * @param {Date} checkIn
 * @param {Date} checkOut
 * @returns {Promise<boolean>} true nếu không trùng, false nếu có trùng
 */
export const isRoomAvailable = async (roomId, checkIn, checkOut) => {
    const overlappingBooking = await models.Booking.findOne({
        where: {
            room_id: roomId,
            status: { [Op.notIn]: ['cancelled', 'expired'] },
            [Op.and]: [
                {
                    check_in: {
                        [Op.lt]: checkOut, // check_in cũ < check_out mới
                    },
                },
                {
                    check_out: {
                        [Op.gt]: checkIn, // check_out cũ > check_in mới
                    },
                },
            ],
        },
    });

    return !overlappingBooking;
};

export const hasRoomAvailable = async (roomTypeId, checkIn, checkOut) => {
    const rooms = await models.Room.findAll({
        where: { room_type_id: roomTypeId, status: 'active' },
    });

    for (const room of rooms) {
        const available = await isRoomAvailable(room.id, checkIn, checkOut);
        if (available) return true;
    }

    return false;
};

export const getRoomAvailableIds = async (roomTypeId, checkIn, checkOut) => {
    const ids = [];

    const rooms = await models.Room.findAll({
        where: { room_type_id: roomTypeId, status: 'active' },
        attributes: ['id'],
    });

    for (const room of rooms) {
        const available = await isRoomAvailable(room.id, checkIn, checkOut);
        if (available) {
            ids.push(room.id);
        }
    }

    return ids;
};
