import models from '../../models/index.js';

export const getUserService = async (id) => {
    const user = await models.User.findByPk(id);

    if (!user) {
        throw new Error(`Người dùng với id là ${id} không tồn tại`);
    }

    return user;
};
