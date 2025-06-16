import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const predictGuests = async ({ hotelId }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.get(`${API_URL}/predicts/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
