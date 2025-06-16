import models from '../../models/index.js';
import { createOrUpdateRoomTypeAmenitiesService } from '../amenityServices/createOrUpdateRoomTypeAmenitiesService.js';
import { uploadImagesService } from '../uploadServices/uploadImagesService.js';

export const createRoomTypeService = async (data) => {
    if (data.images) {
        const imageUrls = uploadImagesService(data.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        data.images = JSON.stringify(imageUrls);
    }
    const roomType = await models.RoomType.create(data);
    if (data.amenityIds) {
        createOrUpdateRoomTypeAmenitiesService({
            roomTypeId: roomType.id,
            amenityIds: data.amenityIds,
        });
    }
    return roomType;
};
