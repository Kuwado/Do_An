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
            status: { [Op.not]: 'cancelled' },
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
