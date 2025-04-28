import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login/user`, {
            username,
            password,
        });
        return { success: true, data: res.data };
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

// Admin
export const loginAdminFirstStep = async (username) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login/admin/first-step`, { username });
        return { success: true, data: res.data };
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
        return { success: true, data: res.data };
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
