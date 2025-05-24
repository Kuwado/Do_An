import models from '../../models/index.js';

export const getRoomService = async ({ id }) => {
    const room = await models.Room.findByPk(id, {
        include: [
            {
                model: models.RoomType,
                as: 'room_type',
            },
        ],
    });

    if (!room) {
        throw new Error(`Phòng với id là ${id} không tồn tại`);
    }

    return room;
};
