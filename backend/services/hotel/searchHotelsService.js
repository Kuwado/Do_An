import models from '../../models/index.js';
import { Op } from 'sequelize';
import { formatCheckIn, formatCheckOut } from '../../utils/formatDateTime.js';
import { isRoomAvailable } from '../room/roomAvailable.js';

export const searchHotelsService = async ({
    city,
    checkIn,
    checkOut,
    quantity,
    people,
    from,
    to,
    amenities,
    page = 1,
    limit = 10,
    sortBy = '',
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
        {
            model: models.Amenity,
            as: 'amenities',
            through: { attributes: [] },
        },
    ];

    if (checkIn && checkOut) {
        include.push({
            model: models.RoomType,
            as: 'room_types',
        });
    }

    if (amenities) {
        include.push(
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
        );
    }

    const offset = (page - 1) * limit;

    const order = [];

    if (sortBy === 'price-asc') {
        order.push(['min_price', 'asc']);
    } else if (sortBy === 'price-desc') {
        order.push(['min_price', 'desc']);
    } else if (sortBy === 'rating-asc') {
        order.push(['rating', 'asc']);
    } else if (sortBy === 'rating-desc') {
        order.push(['rating', 'desc']);
    } else {
        order.push(['min_price', 'asc']);
    }

    const { count, rows } = await models.Hotel.findAndCountAll({
        where: whereClause,
        include: include.length > 0 ? include : undefined,
        offset,
        limit,
        order,
        distinct: true,
    });

    let hotels = rows.map((h) => h.toJSON());

    // Kiểm tra điều kiện search
    if (checkIn && checkOut) {
        const filteredHotels = [];
        const formattedCheckIn = formatCheckIn(checkIn);
        const formattedCheckOut = formatCheckOut(checkOut);

        for (const hotel of hotels) {
            const roomCandidates = [];

            for (const rt of hotel.room_types) {
                const activeRooms = await models.Room.findAll({
                    where: { room_type_id: rt.id, status: 'active' },
                });

                const checkPromises = activeRooms.map(async (room) => {
                    const available = await isRoomAvailable(
                        room.id,
                        formattedCheckIn,
                        formattedCheckOut,
                    );
                    return available
                        ? { roomId: room.id, capacity: rt.capacity }
                        : null;
                });

                const availableRooms = (
                    await Promise.all(checkPromises)
                ).filter(Boolean);
                roomCandidates.push(...availableRooms);
            }

            if (quantity && people) {
                // Sắp xếp giảm dần theo capacity để tối ưu
                roomCandidates.sort((a, b) => b.capacity - a.capacity);

                let selected = [];
                let totalCapacity = 0;

                for (const room of roomCandidates) {
                    if (selected.length >= quantity) break;
                    selected.push(room);
                    totalCapacity += room.capacity;
                }

                if (selected.length >= quantity && totalCapacity >= people) {
                    filteredHotels.push(hotel);
                }
            } else if (quantity) {
                if (roomCandidates.length >= quantity) {
                    filteredHotels.push(hotel);
                }
            } else if (people) {
                roomCandidates.sort((a, b) => b.capacity - a.capacity);
                let count = people;
                for (const room of roomCandidates) {
                    count -= room.capacity;
                    if (count <= 0) {
                        filteredHotels.push(hotel);
                        break;
                    }
                }
            } else {
                if (roomCandidates.length > 0) {
                    filteredHotels.push(hotel);
                }
            }
        }

        hotels = filteredHotels;
    }

    // Phân loại amenities
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
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        hotels,
    };
};
