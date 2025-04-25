import models from '../../models/index.js';
import { Op } from 'sequelize';

export const searchHotelsService = async ({
    city,
    check_in,
    check_out,
    quantity,
    people,
    from,
    to,
    amenities,
    page = 1,
    limit = 10,
    sortPrice = '',
    sortRating = '',
}) => {
    const whereClause = {};

    if (city) {
        whereClause.city = { [Op.substring]: city };
    }
    if (from && to) {
        whereClause.min_price = {
            [Op.between]: [Number(from), Number(to)],
        };
    }

    const include = [
        // Join đầu tiên để lọc khách sạn theo tiện nghi được chọn
        ...(Array.isArray(amenities) && amenities.length > 0
            ? [
                  {
                      model: models.Amenity,
                      as: 'filterAmenities',
                      attributes: [],
                      through: { attributes: [] },
                      where: {
                          id: { [Op.in]: amenities },
                      },
                      required: true,
                  },
              ]
            : []),

        // Join thứ hai để trả về toàn bộ tiện nghi của khách sạn
        {
            model: models.Amenity,
            as: 'amenities',
            through: { attributes: [] },
        },
    ];

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
    }

    return {
        message: 'Lấy thành công danh sách khách sạn',
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        hotels,
    };
};
