import express from 'express';
import multer from 'multer';

import {
    createRoom,
    createRoomType,
    deleteRoom,
    deleteRoomType,
    getRoomById,
    getRooms,
    getRoomTypeById,
    getRoomTypes,
    updateRoom,
    updateRoomType,
} from '../controllers/RoomController.js';
import { authAdminMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();
const upload = multer();

router.post(
    '/types/create',
    upload.array('images', 10),
    authAdminMiddleware,
    createRoomType,
);
router.post(
    '/types/update/:id',
    upload.array('images', 10),
    authAdminMiddleware,
    updateRoomType,
);
router.get('/types', getRoomTypes);
router.get('/types/:id', getRoomTypeById);
router.delete('/types/delete/:id', deleteRoomType);

// Room
router.post('/create', authAdminMiddleware, createRoom);
router.post('/update/:id', authAdminMiddleware, updateRoom);
router.get('/', getRooms);
router.get('/:id', getRoomById);
router.delete('/delete/:id', deleteRoom);

export default router;
