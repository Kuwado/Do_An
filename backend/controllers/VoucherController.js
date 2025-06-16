import models from '../models/index.js';
import { applyVoucherService } from '../services/voucherServices/applyVoucherService.js';
import { createVoucherService } from '../services/voucherServices/createVoucherService.js';
import { deleteVoucherService } from '../services/voucherServices/deleteVoucherService.js';
import { getVoucherService } from '../services/voucherServices/getVoucherService.js';
import { getVouchersService } from '../services/voucherServices/getVouchersService.js';
import { updateVoucherService } from '../services/voucherServices/updateVoucherService.js';

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
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách các dịch vụ của khách sạn thất bại',
            error: error.message,
        });
    }
};

export const getVouchers = async (req, res) => {
    const hotelId = req.query.hotelId;
    const type = req.query.type;
    const discountType = req.query.discountType;
    const status = req.query.status;
    const sortDate = req.query.sortDate;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    try {
        const result = await getVouchersService({
            hotelId,
            type,
            discountType,
            status,
            sortDate,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách Voucher',
            vouchers: result.vouchers,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách Voucher thất bại',
            error: error.message,
        });
    }
};

export const getVoucherById = async (req, res) => {
    const id = req.params.id;

    try {
        const voucher = await getVoucherService({
            id,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin voucher',
            voucher,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin voucher thất bại',
            error: error.message,
        });
    }
};

export const createVoucher = async (req, res) => {
    try {
        const voucherData = req.body;
        voucherData.hotel_id = req.user.hotel_id;

        const voucher = await createVoucherService(voucherData);

        res.status(201).json({
            success: true,
            message: 'Tạo voucher thành công',
            voucher,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo voucher thất bại',
            error: error.message,
        });
    }
};

export const updateVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const updateData = req.body;

        const voucher = await models.Voucher.findByPk(voucherId);
        if (!voucher) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy voucher này',
            });
        }

        const result = await updateVoucherService(voucher, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật voucher thành công',
            voucher: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật voucher thất bại',
            error: error.message,
        });
    }
};

export const deleteVoucher = async (req, res) => {
    const id = req.params.id;

    try {
        await deleteVoucherService(id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thành công voucher',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Xóa voucher thất bại',
            error: error.message,
        });
    }
};
