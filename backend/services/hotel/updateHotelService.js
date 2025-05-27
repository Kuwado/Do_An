import models from '../../models/index.js';
import { Op } from 'sequelize';
import { deleteImagesService } from '../upload/deleteImagesService.js';
import { uploadImagesService } from '../upload/uploadImagesService.js';
import { uploadImageService } from '../upload/uploadImageService.js';

export const updateHotelService = async (hotel, updateData) => {
    if (updateData.images && updateData.images.length > 0) {
        const oldImages = JSON.parse(hotel.images);
        if (oldImages && oldImages != []) {
            deleteImagesService(oldImages);
        }
        const imageUrls = uploadImagesService(updateData.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.images = JSON.stringify(imageUrls);
    } else {
        updateData.images = hotel.images;
    }

    if (updateData.avatar && updateData.avatar !== hotel.avatar) {
        const oldImages = hotel.avatar;
        if (oldImages) {
            deleteImagesService([oldImages]);
        }
        const imageUrl = uploadImageService(updateData.avatar);
        if (!imageUrl) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.avatar = imageUrl;
    } else {
        updateData.avatar = hotel.avatar;
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (hotel[key] !== undefined) {
            hotel[key] = value;
        }
    });

    await hotel.save();

    return hotel;
};
