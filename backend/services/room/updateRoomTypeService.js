import models from '../../models/index.js';
import { deleteImagesService } from '../upload/deleteImagesService.js';
import { uploadImagesService } from '../upload/uploadImagesService.js';

export const updateRoomTypeService = async (roomType, updateData) => {
    if (updateData.images) {
        const oldImages = JSON.parse(roomType.images);
        if (oldImages && oldImages != []) {
            deleteImagesService(oldImages);
        }
        const imageUrls = uploadImagesService(updateData.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.images = JSON.stringify(imageUrls);
    }
    Object.entries(updateData).forEach(([key, value]) => {
        if (roomType[key] !== undefined) {
            roomType[key] = value;
        }
    });

    await roomType.save();

    return roomType;
};
