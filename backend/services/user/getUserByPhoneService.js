import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getUserByPhoneService = async (phone) => {
    const user = await models.User.findOne({
        where: {
            [Op.or]: [
                { username: { [Op.substring]: phone } },
                { phone: { [Op.substring]: phone } },
            ],
        },
    });

    if (!user) {
        throw new Error(`Không tìm thấy người dùng`);
    }

    return user;
};
