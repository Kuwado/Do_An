import express from 'express';

import {
    createBooking,
    createServiceBooking,
    getBookingByAdmin,
    getBookingById,
    getBookingsByHotelId,
    getBookingsByUserId,
    updateBooking,
} from '../controllers/BookingController.js';
import {
    authAllMiddleware,
    authUserMiddleware,
} from '../middlewares/AuthMiddleware.js';
import { getServiceBookingsByHotelId } from '../controllers/ServiceController.js';

const router = express.Router();

router.post('/create', authUserMiddleware, createBooking);
router.post('/update/:id', authAllMiddleware, updateBooking);
router.post('/service/create', authUserMiddleware, createServiceBooking);
router.get('/services/hotel/:hotelId', getServiceBookingsByHotelId);

router.get('/user/:id', authUserMiddleware, getBookingsByUserId);
router.get('/detail/:id', authUserMiddleware, getBookingById);
router.get('/hotel/:hotelId', getBookingsByHotelId);
router.get('/by-admin/:id', getBookingByAdmin);

export default router;
