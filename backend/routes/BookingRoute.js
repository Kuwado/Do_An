import express from 'express';

import {
    createBooking,
    createServiceBooking,
    getBookingById,
} from '../controllers/BookingController.js';
import { authUserMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authUserMiddleware, createBooking);
router.post('/services/create', createServiceBooking);
router.get('/:id', authUserMiddleware, getBookingById);

export default router;
