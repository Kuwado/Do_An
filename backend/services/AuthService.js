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

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' },
    );
    return { message: 'Đăng nhập thành công', token };
};

// Hàm đăng nhập cho Staff
export const loginStaffService = async (username, password) => {
    const staff = await Staff.findOne({ where: { username } });

    if (!staff) {
        throw new Error('Tài khoản không tồn tại');
    }

    const isMatch = await staff.checkPassword(password);
    if (!isMatch) {
        throw new Error('Mật khẩu không đúng');
    }

    const token = jwt.sign(
        { id: staff.id, username: staff.username, role: staff.role },
        JWT_SECRET,
        { expiresIn: '7d' },
    );
    return { message: 'Đăng nhập thành công', token };
};
