import express from 'express';
import {
    createOrUpdateHotelAmenities,
    createOrUpdateRoomTypeAmenities,
    getAmenities,
    getAmenitiesByHotelId,
    getAmenitiesByRoomTypeId,
} from '../controllers/AmenityController.js';

const router = express.Router();

router.get('/', getAmenities);
router.get('/hotel/:hotelId', getAmenitiesByHotelId);
router.post('/hotel/:hotelId/update', createOrUpdateHotelAmenities);
router.get('/room/:roomTypeId', getAmenitiesByRoomTypeId);
router.post('/room/:roomTypeId/update', createOrUpdateRoomTypeAmenities);

export default router;
