import express from 'express';
import {
    getHotelById,
    getHotels,
    searchHotels,
} from '../controllers/HotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/search', searchHotels);
router.get('/:id', getHotelById);

export default router;
