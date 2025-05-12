import express from 'express';
import {
    getServiceBookingsByBookingId,
    getServicesByHotelId,
    updateServiceBooking,
} from '../controllers/ServiceController.js';

const router = express.Router();

router.get('/hotel/:hotelId', getServicesByHotelId);
router.get('/booking/:bookingId', getServiceBookingsByBookingId);
router.post('/booking/update/:id', updateServiceBooking);

export default router;
