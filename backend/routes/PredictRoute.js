import express from 'express';

import { predictGuests } from '../controllers/PredictController.js';

const router = express.Router();

router.get('/:hotelId', predictGuests);

export default router;
