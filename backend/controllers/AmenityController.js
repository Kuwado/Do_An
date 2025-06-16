import { createOrUpdateHotelAmenitiesService } from '../services/amenityServices/createOrUpdateHotelAmenitiesService.js';
import { createOrUpdateRoomTypeAmenitiesService } from '../services/amenityServices/createOrUpdateRoomTypeAmenitiesService.js';
import { getAmenitiesByHotelIdService } from '../services/amenityServices/getAmenitiesByHotelIdService.js';
import { getAmenitiesByRoomTypeIdService } from '../services/amenityServices/getAmenitiesByRoomTypeIdService.js';
import { getAmenitiesService } from '../services/amenityServices/getAmenitiesService.js';

export const getAmenities = async (req, res) => {
    try {
        const amenities = await getAmenitiesService();
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách tiện nghi',
            amenities,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getAmenitiesByHotelId = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;

        const amenities = await getAmenitiesByHotelIdService({ hotelId });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách tiện nghi của khách sạn',
            amenities,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách tiện nghi của khách sạn thất bại',
            error: error.message,
        });
    }
};

export const getAmenitiesByRoomTypeId = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;

        const amenities = await getAmenitiesByRoomTypeIdService({ roomTypeId });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách tiện nghi của phòng',
            amenities,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách tiện nghi của phòng thất bại',
            error: error.message,
        });
    }
};

export const createOrUpdateHotelAmenities = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const amenityIds = req.body.amenityIds;

        const amenity_ids = await createOrUpdateHotelAmenitiesService({
            hotelId,
            amenityIds,
        });

        return res.status(200).json({
            success: true,
            message: 'Cập nhật tiện nghi khách sạn thành công',
            amenity_ids,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật tiện nghi khách sạn thất bại',
            error: error.message,
        });
    }
};

export const createOrUpdateRoomTypeAmenities = async (req, res) => {
    try {
        const roomTypeId = req.params.roomTypeId;
        const amenityIds = req.body.amenityIds;

        const amenity_ids = await createOrUpdateRoomTypeAmenitiesService({
            roomTypeId,
            amenityIds,
        });

        return res.status(200).json({
            success: true,
            message: 'Cập nhật tiện nghi cho loại phòng thành công',
            amenity_ids,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật tiện nghi cho loại phòng thất bại',
            error: error.message,
        });
    }
};
