import express from 'express';

import {
    createBooking,
    createServiceBooking,
} from '../controllers/BookingController.js';

const router = express.Router();

router.post('/create', createBooking);
router.post('/services/create', createServiceBooking);

export default router;
