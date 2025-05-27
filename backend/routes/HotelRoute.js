import express from 'express';
import multer from 'multer';

import {
    getHotelById,
    getHotels,
    searchHotels,
    updateHotel,
} from '../controllers/HotelController.js';

const router = express.Router();
const upload = multer();

const uploadHotelImages = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]);

router.get('/', getHotels);
router.get('/search', searchHotels);
router.get('/:id', getHotelById);
router.post('/update/:id', uploadHotelImages, updateHotel);

export default router;
