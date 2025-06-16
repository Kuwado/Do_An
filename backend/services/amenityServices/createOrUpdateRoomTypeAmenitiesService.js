import models from '../../models/index.js';

export const createOrUpdateRoomTypeAmenitiesService = async ({
    roomTypeId = '',
    amenityIds = [],
}) => {
    const roomType = await models.RoomType.findByPk(roomTypeId);

    if (!roomType) {
        throw new Error(`Loại phòng với id ${roomTypeId} không tồn tại`);
    }

    await roomType.setAmenities(amenityIds);

    return amenityIds;
};
