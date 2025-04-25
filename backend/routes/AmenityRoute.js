import express from 'express';
import { getAmenities } from '../controllers/AmenityController.js';

const router = express.Router();

router.get('/', getAmenities);

export default router;
