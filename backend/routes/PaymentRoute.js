import express from 'express';
import {
    createPaymentUrl,
    vnpayReturn,
} from '../controllers/PaymentController.js';

const router = express.Router();

router.post('/create-payment', createPaymentUrl);
router.get('/vnpay-return', vnpayReturn);

export default router;
