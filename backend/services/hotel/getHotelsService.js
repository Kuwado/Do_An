import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getHotelsService = async ({
    name = '',
    city = '',
    page = 1,
    limit = 10,
    sortPrice = '',
    sortRating = '',
}) => {
    const whereClause = {};
    if (name) {
        whereClause.name = { [Op.substring]: name };
    }
    if (city) {
        whereClause.city = { [Op.substring]: city };
    }

    const include = [];
    include.push({
        model: models.Amenity,
        as: 'amenities',
        through: {
            attributes: [],
        },
    });

    const offset = (page - 1) * limit;

    const order = [];
    if (sortPrice === 'asc' || sortPrice === 'desc') {
        order.push(['average_price', sortPrice]);
    }
    if (sortRating === 'asc' || sortRating === 'desc') {
        order.push(['rating', sortRating]);
    }

    const { count, rows } = await models.Hotel.findAndCountAll({
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        offset,
        limit,
        order,
        distinct: true,
    });

    const hotels = rows.map((h) => h.toJSON());

    for (const hotel of hotels) {
        const groupedAmenities = {
            bathroom: [],
            view: [],
            general: [],
        };

        if (Array.isArray(hotel.amenities)) {
            hotel.amenities.forEach((a) => {
                if (groupedAmenities[a.category]) {
                    groupedAmenities[a.category].push(a);
                }
            });
        }

        hotel.amenities = groupedAmenities;
        hotel.images = JSON.parse(hotel.images);
    }

    return {
        message: 'Lấy thành công danh sách khách sạn',
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        hotels,
    };
};
