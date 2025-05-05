import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getServicesByHotelId = async ({ hotelId = '' }) => {
    try {
        const res = await axios.get(`${API_URL}/services/?hotelId=${hotelId}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
