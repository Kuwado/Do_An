import models from '../../models/index.js';
import { Op } from 'sequelize';
import { deleteImagesService } from '../upload/deleteImagesService.js';
import { uploadImageService } from '../upload/uploadImageService.js';

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

    if (updateData.avatar && updateData.avatar !== staff.avatar) {
        const oldImages = staff.avatar;
        if (oldImages) {
            deleteImagesService([oldImages]);
        }
        const imageUrl = uploadImageService(updateData.avatar);
        if (!imageUrl) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.avatar = imageUrl;
    } else {
        updateData.avatar = staff.avatar;
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (staff[key] !== undefined) {
            staff[key] = value;
        }
    });

    await staff.save();

    return staff;
};
