import models from '../models/index.js';
import { getCitiesService } from '../services/city/getCitiesService.js';
import { getHotelService } from '../services/hotel/getHotelService.js';
import { getHotelsService } from '../services/hotel/getHotelsService.js';
import { searchHotelsService } from '../services/hotel/searchHotelsService.js';
import { updateHotelService } from '../services/hotel/updateHotelService.js';

export const getHotelById = async (req, res) => {
    const id = req.params.id;
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    try {
        const hotel = await getHotelService({ id, checkIn, checkOut });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin khách sạn',
            hotel,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getHotels = async (req, res) => {
    const name = req.query.name;
    const city = req.query.city;
    const checkIn = req.query.check_in;
    const checkOut = req.query.check_out;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortPrice = req.query.sort_price || '';
    const sortRating = req.query.sortRating || '';

    try {
        const result = await getHotelsService({
            name,
            city,
            checkIn,
            checkOut,
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
    const sortBy = req.query.sortBy || '';
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
            sortBy,
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

export const updateHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const updateData = req.body;

        if (req.files?.images) {
            updateData.images = req.files.images;
        }

        if (req.files?.avatar && req.files.avatar.length > 0) {
            updateData.avatar = req.files.avatar[0];
        }

        const hotel = await models.Hotel.findByPk(hotelId);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy khách sạn này',
            });
        }

        const result = await updateHotelService(hotel, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật khách sạn thành công',
            room_type: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật khách sạn thất bại',
            error: error.message,
        });
    }
};
