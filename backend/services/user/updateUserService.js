import models from '../../models/index.js';
import { Op } from 'sequelize';
import { deleteImagesService } from '../upload/deleteImagesService.js';
import { uploadImageService } from '../upload/uploadImageService.js';

export const updateUserService = async (user, updateData) => {
    if (updateData.username && updateData.username !== user.username) {
        const checkUserName = await models.User.findOne({
            where: {
                username: updateData.username,
                id: { [Op.ne]: user.id },
            },
        });

        if (checkUserName) {
            throw new Error(`Tên đăng nhập ${updateData.username} đã tồn tại`);
        }
    }

    if (updateData.avatar && updateData.avatar !== user.avatar) {
        const oldImages = user.avatar;
        if (oldImages) {
            deleteImagesService([oldImages]);
        }
        const imageUrl = uploadImageService(updateData.avatar);
        if (!imageUrl) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.avatar = imageUrl;
    } else {
        updateData.avatar = user.avatar;
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (user[key] !== undefined) {
            user[key] = value;
        }
    });

    await user.save();

    return user;
};
