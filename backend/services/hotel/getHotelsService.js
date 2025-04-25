import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getHotelsService = async ({
    name = '',
    city = '',
    amenity = false,
    room = false,
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
    if (amenity) {
        include.push({
            model: models.Amenity,
            as: 'amenities',
            through: {
                attributes: [],
            },
        });
    }
    if (room) {
        include.push({
            model: models.RoomType,
            as: 'room_types',
        });
    }

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

    if (amenity) {
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
    }

    if (room) {
        await Promise.all(
            hotels.map(async (hotel) => {
                let total = 0;
                let available = 0;

                for (const rt of hotel.room_types) {
                    const rooms = await models.Room.findAll({
                        where: { room_type_id: rt.id },
                    });

                    const availableRooms = rooms.filter(
                        (r) => r.status === 'available',
                    );

                    rt.total_rooms = rooms.length;
                    rt.available_rooms = availableRooms.length;

                    total += rooms.length;
                    available += availableRooms.length;
                }

                hotel.total_rooms = total;
                hotel.available_rooms = available;
            }),
        );
    }

    return {
        message: 'Lấy thành công danh sách khách sạn',
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        hotels,
    };
};
