import models from '../../models/index.js';
import { Op } from 'sequelize';

export const updateRoomService = async (room, updateData) => {
    if (room.status === 'active' && updateData.status === 'maintenance') {
        const today = new Date();
        const bookings = await models.Booking.findAll({
            where: {
                room_id: room.id,
                check_out: {
                    [Op.gt]: today,
                },
                status: {
                    [Op.in]: ['pending', 'confirmed'],
                },
            },
        });

        if (bookings.length > 0) {
            throw new Error(`Phòng đang có đơn đặt`);
        }
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (room[key] !== undefined) {
            room[key] = value;
        }
    });

    await room.save();

    return room;
};
