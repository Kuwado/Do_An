import express from 'express';

import {
    createBooking,
    createServiceBooking,
    getBookingById,
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
router.get('/:id', authUserMiddleware, getBookingById);

export default router;
