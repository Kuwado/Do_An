import { where } from 'sequelize';
import models from '../../models/index.js';
import { Op } from 'sequelize';

export const deleteRoomService = async (roomId) => {
    const room = await models.Room.findByPk(roomId);

    if (!room) {
        throw new Error('Phòng không tồn tại');
    }

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
        throw new Error(`Loại phòng đang có đơn đặt`);
    }

    await room.destroy();
};
