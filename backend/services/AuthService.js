import User from '../models/User.js';
import Staff from '../models/Staff.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Hàm đăng nhập cho User
export const loginUserService = async (username, password) => {
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new Error('Tài khoản không tồn tại');
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
        throw new Error('Mật khẩu không đúng');
    }

    const payload = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return { message: 'Đăng nhập thành công', token, user: payload };
};

// Hàm đăng nhập cho Admin
export const loginAdminServiceFirstStep = async (username) => {
    const staff = await Staff.findOne({ where: { username } });
    if (!staff) {
        throw new Error('Tài khoản không tồn tại');
    }

    const payload = {
        username: staff.username,
        role: staff.role,
        first_name: staff.first_name,
        last_name: staff.last_name,
        avatar: staff.avatar,
    };

    return { message: 'Sang bước tiếp theo', admin: payload };
};

export const loginAdminService = async (username, password) => {
    const staff = await Staff.findOne({ where: { username } });

    const isMatch = await staff.checkPassword(password);
    if (!isMatch) {
        throw new Error('Mật khẩu không đúng');
    }

    const payload = {
        id: staff.id,
        username: staff.username,
        role: staff.role,
        first_name: staff.first_name,
        last_name: staff.last_name,
        avatar: staff.avatar,
        hotel_id: staff.hotel_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return { message: 'Đăng nhập thành công', token, admin: payload };
};
