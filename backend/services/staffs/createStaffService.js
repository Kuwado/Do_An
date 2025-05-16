import models from '../../models/index.js';

export const createStaffService = async (data) => {
    const checkUserName = await models.Staff.findOne({
        where: { username: data.username },
    });

    if (checkUserName) {
        throw new Error(`Tên đăng nhập ${data.username} đã tồn tại`);
    }

    const hotel = await models.Hotel.findByPk(data.hotel_id);
    if (!hotel) {
        throw new Error(`Khách sạn với ${data.hotel_id} không tồn tại`);
    }

    const staff = await models.Staff.create(data);

    return staff;
};
