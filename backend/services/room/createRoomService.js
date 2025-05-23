import models from '../../models/index.js';

export const createRoomService = async (data) => {
    const roomType = models.RoomType.findByPk(data.room_type_id);

    if (!roomType) {
        throw new Error(
            `Loại phòng với id là ${data.room_type_id} không tồn tại`,
        );
    }

    const room = await models.Room.create(data);
    return room;
};
