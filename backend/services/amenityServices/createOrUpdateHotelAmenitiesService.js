import models from '../../models/index.js';

export const createOrUpdateHotelAmenitiesService = async ({
    hotelId = '',
    amenityIds = [],
}) => {
    const hotel = await models.Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error(`Khách sạn với id ${hotelId} không tồn tại`);
    }

    await hotel.setAmenities(amenityIds);

    return amenityIds;
};
