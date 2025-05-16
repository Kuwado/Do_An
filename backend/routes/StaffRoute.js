import express from 'express';
import {
    createStaff,
    deleteStaff,
    getStaffById,
    getStaffsByHotelId,
    updateStaff,
} from '../controllers/StaffController.js';

const router = express.Router();

router.post('/create', createStaff);
router.post('/update/:id', updateStaff);
router.delete('/delete/:id', deleteStaff);
router.get('/hotel/:hotelId', getStaffsByHotelId);
router.get('/:id', getStaffById);

export default router;
