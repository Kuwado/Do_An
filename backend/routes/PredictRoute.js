import express from 'express';

import { predictGuests } from '../controllers/PredictController.js';
import { authAdminMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/:hotelId', authAdminMiddleware, predictGuests);

export default router;
