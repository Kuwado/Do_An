import models from '../../models/index.js';
import { createOrUpdateRoomTypeAmenitiesService } from '../amenity/createOrUpdateRoomTypeAmenitiesService.js';
import { uploadImagesService } from '../upload/uploadImagesService.js';

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
