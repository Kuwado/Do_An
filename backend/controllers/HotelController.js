import { getCitiesService } from '../services/city/getCitiesService.js';
import { getHotelService } from '../services/hotel/getHotelService.js';
import { getHotelsService } from '../services/hotel/getHotelsService.js';
import { searchHotelsService } from '../services/hotel/searchHotelsService.js';

export const getHotelById = async (req, res) => {
    const id = req.params.id;
    const staff = req.query.staff === 'true';
    const admin = req.query.admin === 'true';
    const amenity = req.query.amenity === 'true';
    const room = req.query.room === 'true';
    try {
        const result = await getHotelService(id, {
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortPrice = req.query.sort_price || '';
    const sortRating = req.query.sortRating || '';

    try {
        const result = await getHotelsService({
            name,
            city,
            amenity,
            room,
            page,
            limit,
            sortPrice,
            sortRating,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const searchHotels = async (req, res) => {
    const city = req.query.city;
    const check_in = req.query.check_in;
    const check_out = req.query.check_out;
    const quantity = parseInt(req.query.quantity);
    const people = parseInt(req.query.people);
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    const amenities = req.query.amenities?.split(',') || [];
    const sortPrice = req.query.sort_price || '';
    const sortRating = req.query.sortRating || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await searchHotelsService({
            city,
            check_in,
            check_out,
            quantity,
            people,
            from,
            to,
            amenities,
            sortPrice,
            sortRating,
            page,
            limit,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getCities = async (req, res) => {
    try {
        const result = await getCitiesService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
