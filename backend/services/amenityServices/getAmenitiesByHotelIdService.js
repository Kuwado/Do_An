import models from '../../models/index.js';

export const getAmenitiesByHotelIdService = async ({ hotelId = '' }) => {
    const hotel = await models.Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error(`Khách sạn với id ${hotelId} không tồn tại`);
    }

    const hotelAmenities = await models.HotelAmenity.findAll({
        include: [
            {
                model: models.Amenity,
                as: 'amenity',
            },
        ],
        where: { hotel_id: hotelId },
    });

    const amenities = {
        bathroom: [],
        view: [],
        general: [],
    };

    hotelAmenities.forEach((a) => {
        if (amenities[a.amenity.category]) {
            amenities[a.amenity.category].push(a.amenity);
        }
    });

    return amenities;
};
