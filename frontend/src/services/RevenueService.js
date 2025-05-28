import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRevenue = async ({ hotelId, start, end }) => {
    const params = {};

    if (start) {
        params.start = start;
    }

    if (end) {
        params.end = end;
    }

    const query = new URLSearchParams(params);
    try {
        const res = await axios.get(`${API_URL}/revenues/hotel/${hotelId}?${query.toString()}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
