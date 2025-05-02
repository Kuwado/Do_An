import models from '../../models/index.js';

export const createBookingService = async (data) => {
    // Kiểm tra xem phòng đã được đặt chưa
    const room = await models.Room.findByPk(data.room_id, {
        include: [
            {
                model: models.RoomType,
                as: 'room_type',
            },
        ],
    });

    data.room_price = room.room_type.price;
    data.hotel_id = room.room_type.hotel_id;

    if (!room) {
        throw new Error(`Không tìm thấy phòng ${data.room_id}`);
    }

    const booking = await models.Booking.create(data);

    return { message: 'Đặt phòng thành công', booking };
};
