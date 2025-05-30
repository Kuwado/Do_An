import express from 'express';

import {
    createStaff,
    deleteStaff,
    getStaffById,
    getStaffsByHotelId,
    updateStaff,
} from '../controllers/StaffController.js';

const router = express.Router();

router.get('/:hotelId', getStaffById);

export default router;
