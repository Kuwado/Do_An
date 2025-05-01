import express from 'express';
import {
    getHotelById,
    getHotels,
    searchHotels,
} from '../controllers/HotelController.js';
import { createBooking } from '../controllers/BookingController.js';

const router = express.Router();

router.post('/create', createBooking);

export default router;
