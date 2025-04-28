import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAdmin = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/admins/${id}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
