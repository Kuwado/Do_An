import express from 'express';
import { checkVoucher, getVouchers } from '../controllers/VoucherController.js';
import { authUserMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', getVouchers);
router.get('/check', authUserMiddleware, checkVoucher);
// router.get('/:id', getHotelById);

export default router;
