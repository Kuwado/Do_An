import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username, password) => {
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

// Admin
export const loginAdminFirstStep = async (username) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login/admin/first-step`, { username });
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        return { success: true };
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const loginAdmin = async (username, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login/admin`, {
            username,
            password,
        });
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        localStorage.setItem('token-admin', res.data.token);
        return { success: true };
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const logoutAdmin = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token-admin');
};
