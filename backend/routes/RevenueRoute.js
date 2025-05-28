import express from 'express';
import { getRevenuesByHotel } from '../controllers/RevenueController.js';

const router = express.Router();

router.get('/hotel/:hotelId', getRevenuesByHotel);

export default router;
