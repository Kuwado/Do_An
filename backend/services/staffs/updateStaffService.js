import models from '../../models/index.js';
import { Op } from 'sequelize';

export const updateStaffService = async (staff, updateData) => {
    if (updateData.username) {
        const checkUserName = await models.Staff.findOne({
            where: {
                username: updateData.username,
                id: { [Op.ne]: staff.id },
            },
        });

        if (checkUserName) {
            throw new Error(`Tên đăng nhập ${updateData.username} đã tồn tại`);
        }
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (staff[key] !== undefined) {
            staff[key] = value;
        }
    });

    await staff.save();

    return staff;
};
