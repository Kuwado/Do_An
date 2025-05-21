import models from '../../models/index.js';
import { Sequelize } from 'sequelize';

export const getAmenitiesService = async () => {
    const results = await models.Amenity.findAll({
        attributes: [
            'id',
            'name',
            'category',
            [Sequelize.fn('COUNT', Sequelize.col('Hotels.id')), 'hotelCount'],
        ],
        include: [
            {
                model: models.Hotel,
                as: 'hotels',
                attributes: [],
                through: { attributes: [] },
            },
        ],
        group: ['Amenity.id'],
        order: [['name', 'ASC']],
    });

    const amenitiesWithCount = results.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        count: parseInt(item.get('hotelCount')),
    }));

    const amenities = {
        bathroom: [],
        view: [],
        general: [],
    };

    amenitiesWithCount.forEach((a) => {
        if (amenities[a.category]) {
            amenities[a.category].push(a);
        }
    });

    return amenities;
};
