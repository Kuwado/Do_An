import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username, password, nextUrl) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login/user`, {
            username,
            password,
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        return { success: true };
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('next');
};

export const logoutAdmin = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
};
