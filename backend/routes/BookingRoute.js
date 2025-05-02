import express from 'express';

import {
    createBooking,
    createServiceBooking,
} from '../controllers/BookingController.js';
import { authUserMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authUserMiddleware, createBooking);
router.post('/services/create', createServiceBooking);

export default router;
