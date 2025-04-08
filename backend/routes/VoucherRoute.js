import express from 'express';
import { getVouchers } from '../controllers/VoucherController.js';

const router = express.Router();

router.get('/', getVouchers);
// router.get('/:id', getHotelById);

export default router;
