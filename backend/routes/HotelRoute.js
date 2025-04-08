import express from 'express';
import { getHotelById, getHotels } from '../controllers/HotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/:id', getHotelById);

export default router;
