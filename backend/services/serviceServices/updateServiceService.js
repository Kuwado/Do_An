import { deleteImagesService } from '../uploadServices/deleteImagesService.js';
import { uploadImagesService } from '../uploadServices/uploadImagesService.js';

export const updateServiceService = async (service, updateData) => {
    if (updateData.images && updateData.images.length > 0) {
        const oldImages = JSON.parse(service.images);
        if (oldImages && oldImages != []) {
            deleteImagesService(oldImages);
        }
        const imageUrls = uploadImagesService(updateData.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.images = JSON.stringify(imageUrls);
    } else {
        updateData.images = service.images;
    }
    Object.entries(updateData).forEach(([key, value]) => {
        if (service[key] !== undefined) {
            service[key] = value;
        }
    });

    await service.save();

    return service;
};
