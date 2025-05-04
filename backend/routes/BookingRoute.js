import express from 'express';

import {
    createBooking,
    createServiceBooking,
    getBookingById,
    getBookingsByUserId,
    updateBooking,
} from '../controllers/BookingController.js';
import {
    authAllMiddleware,
    authUserMiddleware,
} from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authUserMiddleware, createBooking);
router.post('/update/:id', authAllMiddleware, updateBooking);
router.post('/services/create', createServiceBooking);
router.get('/user/:id', authUserMiddleware, getBookingsByUserId);
router.get('/detail/:id', authUserMiddleware, getBookingById);

export default router;
