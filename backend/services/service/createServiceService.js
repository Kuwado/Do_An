import models from '../../models/index.js';
import { uploadImagesService } from '../upload/uploadImagesService.js';

export const createServiceService = async (data) => {
    if (data.images) {
        const imageUrls = uploadImagesService(data.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        data.images = JSON.stringify(imageUrls);
    }

    const service = await models.Service.create(data);

    return service;
};
