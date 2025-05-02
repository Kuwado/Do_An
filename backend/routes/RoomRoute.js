import express from 'express';

import {
    getRoomTypeById,
    getRoomTypes,
} from '../controllers/RoomController.js';

const router = express.Router();

router.get('/types', getRoomTypes);
router.get('/types/:id', getRoomTypeById);
// router.get('/:id', getRoomById);

export default router;
