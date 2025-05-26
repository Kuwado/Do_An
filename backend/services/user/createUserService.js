import models from '../../models/index.js';

export const createUserService = async (data) => {
    const checkUserName = await models.User.findOne({
        where: { username: data.username },
    });

    if (checkUserName) {
        throw new Error(`Tên đăng nhập ${data.username} đã tồn tại`);
    }

    const user = await models.User.create(data);

    return user;
};
