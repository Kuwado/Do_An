import Staff from '../../models/Staff.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

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
