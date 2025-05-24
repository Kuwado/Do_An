import express from 'express';
import {
    checkVoucher,
    createVoucher,
    deleteVoucher,
    getVoucherById,
    getVouchers,
    updateVoucher,
} from '../controllers/VoucherController.js';
import {
    authAdminMiddleware,
    authUserMiddleware,
} from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', getVouchers);
router.get('/check', authUserMiddleware, checkVoucher);
router.post('/create', authAdminMiddleware, createVoucher);
router.post('/update/:id', authAdminMiddleware, updateVoucher);
router.delete('/delete/:id', deleteVoucher);
router.get('/:id', getVoucherById);

export default router;
