import models from '../models/index.js';
import { createUserService } from '../services/userServices/createUserService.js';
import { getUserByPhoneService } from '../services/userServices/getUserByPhoneService.js';
import { getUserService } from '../services/userServices/getUserService.js';
import { updateUserService } from '../services/userServices/updateUserService.js';

export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await getUserService(id);
        return res.status(200).json({
            success: true,
            message: `Lấy thành công thông tin người dùng`,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin người dùng thất bại',
            error: error.message,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await createUserService(userData);

        res.status(201).json({
            success: true,
            message: 'Tạo thành công người dùng',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo người dùng thất bại',
            error: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (req.file) {
            updateData.avatar = req.file;
        }

        const user = await models.User.findByPk(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        const result = await updateUserService(user, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật người dùng thành công',
            user: result,
        });
    } catch (error) {
        console.error('Update staff error:', error);
        return res.status(500).json({
            message: 'Cập nhật người dùng thất bại',
            error: error.message,
        });
    }
};

export const getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    try {
        const user = await getUserByPhoneService(phone);
        return res.status(200).json({
            success: true,
            message: `Lấy thành công thông tin người dùng`,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin người dùng thất bại',
            error: error.message,
        });
    }
};
