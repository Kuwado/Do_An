import models from '../../models/index.js';

export const getAmenitiesByRoomTypeIdService = async ({ roomTypeId = '' }) => {
    const roomType = await models.RoomType.findByPk(roomTypeId);

    if (!roomType) {
        throw new Error(`Loại phòng với id ${roomTypeId} không tồn tại`);
    }

    const roomTypeAmenities = await models.RoomTypeAmenity.findAll({
        include: [
            {
                model: models.Amenity,
                as: 'amenity',
            },
        ],
        where: { room_type_id: roomTypeId },
    });

    const amenities = {
        bathroom: [],
        view: [],
        general: [],
    };

    roomTypeAmenities.forEach((a) => {
        if (amenities[a.amenity.category]) {
            amenities[a.amenity.category].push(a.amenity);
        }
    });

    return amenities;
};
