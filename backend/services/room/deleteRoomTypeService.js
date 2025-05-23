import { where } from 'sequelize';
import models from '../../models/index.js';
import { Op } from 'sequelize';

export const deleteRoomTypeService = async (roomTypeId) => {
    const roomType = await models.RoomType.findByPk(roomTypeId);

    if (!roomType) {
        throw new Error('Loại phòng không tồn tại');
    }

    const rooms = await models.Room.findAll({
        where: { room_type_id: roomTypeId },
    });

    if (rooms.length > 0) {
        for (const room of rooms) {
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
        }
    }

    await roomType.destroy();
};
