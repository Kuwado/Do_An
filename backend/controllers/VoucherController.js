import { applyVoucherService } from '../services/voucher/applyVoucherService.js';
import { getVouchersService } from '../services/voucher/getVouchersService.js';

export const getVouchers = async (req, res) => {
    const hotelId = req.query.hotelId;
    const type = req.query.type;
    const discountType = req.query.discountType;
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await getVouchersService({
            hotelId,
            type,
            discountType,
            status,
            page,
            limit,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const checkVoucher = async (req, res) => {
    const hotelId = req.query.hotelId;
    const code = req.query.code;
    const type = req.query.type;
    const originalPrice = req.query.originalPrice;

    try {
        const result = await applyVoucherService({
            hotelId,
            code,
            userId: req.user.id,
            type,
            originalPrice,
        });

        if (!result.susscess) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
