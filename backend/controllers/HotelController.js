import {
    getHotelByIdService,
    getHotelsService,
} from '../services/HotelService.js';

export const getHotelById = async (req, res) => {
    const id = req.params.id;
    const staff = req.query.staff === 'true';
    const admin = req.query.admin === 'true';
    const amenity = req.query.amenity === 'true';
    const room = req.query.room === 'true';
    try {
        const result = await getHotelByIdService(id, {
            staff,
            admin,
            amenity,
            room,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getHotels = async (req, res) => {
    const name = req.query.name;
    const city = req.query.city;
    const amenity = req.query.amenity === 'true';
    const room = req.query.room === 'true';
    try {
        const result = await getHotelsService({
            name,
            city,
            amenity,
            room,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
