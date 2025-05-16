import models from '../models/index.js';
import { createStaffService } from '../services/staffs/createStaffService.js';
import { deleteStaffService } from '../services/staffs/deleteStaffService.js';
import { getStaffsByHotelIdService } from '../services/staffs/getStaffsByHotelIdService.js';
import { getStaffService } from '../services/staffs/getStaffService.js';
import { updateStaffService } from '../services/staffs/updateStaffService.js';

export const createStaff = async (req, res) => {
    try {
        const staffData = req.body;

        const staff = await createStaffService(staffData);

        res.status(201).json({
            success: true,
            message: 'Tạo thành công nhân viên',
            staff,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo nhân viên thất bại',
            error: error.message,
        });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const staffId = req.params.id;
        const updateData = req.body;

        const staff = await models.Staff.findByPk(staffId);
        if (!staff) {
            return res
                .status(404)
                .json({ success: false, message: 'Không tìm thấy staff' });
        }

        const result = await updateStaffService(staff, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật staff thành công',
            staff: result,
        });
    } catch (error) {
        console.error('Update staff error:', error);
        return res.status(500).json({
            message: 'Cập nhật nhân viên thất bại',
            error: error.message,
        });
    }
};

export const getStaffsByHotelId = async (req, res) => {
    const hotelId = req.params.hotelId;
    const name = req.query.name || '';
    const role = req.query.role || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await getStaffsByHotelIdService({
            hotelId,
            name,
            role,
            page,
            limit,
        });

        return res.status(200).json({
            success: true,
            message: `Lấy thành công danh sách nhân viên của khách sạn ${hotel.name}`,
            staffs: result.staffs,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách nhân viên thất bại',
            error: error.message,
        });
    }
};

export const getStaffById = async (req, res) => {
    const id = req.params.id;
    const hotel = req.query.hotel ? req.query.hotel === 'true' : true;

    try {
        const staff = await getStaffService({
            id,
            hotel,
        });

        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin nhân viên',
            staff,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin nhân viên thất bại',
            error: error.message,
        });
    }
};

export const deleteStaff = async (req, res) => {
    const id = req.params.id;

    try {
        const staff = await deleteStaffService(id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thành công nhân viên',
            staff,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Xóa nhân viên thất bại',
            error: error.message,
        });
    }
};
