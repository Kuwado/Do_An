import express from 'express';
import {
    getServiceBookingsByBookingId,
    getServicesByHotelId,
} from '../controllers/ServiceController.js';

const router = express.Router();

router.get('/hotel/:hotelId', getServicesByHotelId);
router.get('/booking/:bookingId', getServiceBookingsByBookingId);

export default router;
