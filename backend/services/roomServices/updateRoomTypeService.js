import { deleteImagesService } from '../uploadServices/deleteImagesService.js';
import { uploadImagesService } from '../uploadServices/uploadImagesService.js';

export const updateRoomTypeService = async (roomType, updateData) => {
    if (updateData.images && updateData.images.length > 0) {
        const oldImages = JSON.parse(roomType.images);
        if (oldImages && oldImages != []) {
            deleteImagesService(oldImages);
        }
        const imageUrls = uploadImagesService(updateData.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.images = JSON.stringify(imageUrls);
    } else {
        updateData.images = roomType.images;
    }
    Object.entries(updateData).forEach(([key, value]) => {
        if (roomType[key] !== undefined) {
            roomType[key] = value;
        }
    });

    await roomType.save();

    return roomType;
};
