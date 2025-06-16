import Staff from '../../models/Staff.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Hàm đăng nhập cho Admin
export const loginAdminFirstStepService = async (username) => {
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
