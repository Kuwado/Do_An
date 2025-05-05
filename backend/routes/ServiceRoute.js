import express from 'express';
import { getServicesByHotelId } from '../controllers/ServiceController.js';

const router = express.Router();

router.get('/', getServicesByHotelId);

export default router;
