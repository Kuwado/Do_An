import express from 'express';
import { getCities } from '../controllers/HotelController.js';

const router = express.Router();

router.get('/cities', getCities);

export default router;
