import express from 'express';
import {
    getServiceBookingsByBookingId,
    getServiceBookingsHistory,
    getServicesByHotelId,
    updateServiceBooking,
} from '../controllers/ServiceController.js';

const router = express.Router();

router.get('/hotel/:hotelId', getServicesByHotelId);
router.get('/booking/:bookingId', getServiceBookingsByBookingId);
router.post('/booking/update/:id', updateServiceBooking);
router.get('/history/:serviceId/:bookingId', getServiceBookingsHistory);

export default router;
