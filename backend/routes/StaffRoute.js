import express from 'express';
import multer from 'multer';

import {
    createStaff,
    deleteStaff,
    getStaffById,
    getStaffsByHotelId,
    updateStaff,
} from '../controllers/StaffController.js';

const router = express.Router();
const upload = multer();

router.post('/create', createStaff);
router.post('/update/:id', upload.single('avatar'), updateStaff);
router.delete('/delete/:id', deleteStaff);
router.get('/hotel/:hotelId', getStaffsByHotelId);
router.get('/:id', getStaffById);

export default router;
