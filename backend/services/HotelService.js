import models from '../models/index.js';
import { Op } from 'sequelize';

export const getHotelByIdService = async (
    id,
    { admin = false, staff = false, amenity = false, room = false },
) => {
    const include = [];

    if (staff) {
        include.push({
            model: models.Staff,
            as: 'staffs',
        });
    }

    if (admin) {
        include.push({
            model: models.Staff,
            as: 'admins',
        });
    }

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

    let hotelInstance = await models.Hotel.findByPk(id, {
        include: include.length > 0 ? include : undefined,
    });

    if (!hotelInstance) {
        throw new Error(`Khách sạn với id là ${id} không tồn tại`);
    }

    const hotel = hotelInstance.toJSON();

    // Phân nhóm amenities theo category
    if (amenity) {
        const groupedAmenities = {
            bathroom: [],
            view: [],
            general: [],
        };

        hotel.amenities.forEach((amenity) => {
            if (groupedAmenities[amenity.category]) {
                groupedAmenities[amenity.category].push(amenity);
            }
        });

        hotel.amenities = groupedAmenities;
    }

    // Tính toán số lượng phòng và phòng trống
    if (room) {
        let total = 0;
        let available = 0;

        for (const rt of hotel.room_types) {
            const rooms = await models.Room.findAll({
                where: { room_type_id: rt.id },
            });

            rt.total_rooms = rooms.length;
            total += rooms.length;

            const availableRooms = rooms.filter(
                (r) => r.status === 'available',
            );
            rt.available_rooms = availableRooms.length;
            available += availableRooms.length;
        }

        hotel.total_rooms = total;
        hotel.available_rooms = available;
    }

    return {
        message: 'Lấy thành công thông tin khách sạn',
        hotel: hotel,
    };
};

export const getHotelsService = async ({
    name = '',
    city = '',
    amenity = false,
    room = false,
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

    const hotelsInstance = await models.Hotel.findAll({
        where: whereClause,
        include: include.length > 0 ? include : undefined,
    });

    const hotels = hotelsInstance.map((h) => h.toJSON());

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
        hotels,
    };
};

export const updateHotelService = async (hotel) => {};

export const deleteHotel = async (id) => {};
