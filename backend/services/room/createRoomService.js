import models from '../../models/index.js';

export const createRoomService = async (data) => {
    const roomType = models.RoomType.findByPk(data.room_type_id);

    if (!roomType) {
        throw new Error(
            `Loại phòng với id là ${data.room_type_id} không tồn tại`,
        );
    }

    if (data.room_number) {
        console.log(data.room_number);
        const roomExisted = models.Room.findOne({
            where: {
                room_number: data.room_number,
                room_type_id: data.room_type_id,
            },
        });

        if (roomExisted.id) {
            throw new Error(`Số phòng ${data.room_number} đã tồn tại`);
        }
    }

    const room = await models.Room.create(data);
    return room;
};
