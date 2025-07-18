import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getReviews = async ({ hotelId = '', page = 1, limit = '' }) => {
    try {
        const query = new URLSearchParams({
            hotel_id: hotelId,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const res = await axios.get(`${API_URL}/reviews?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createReview = async ({ hotelId, bookingId, rate, comment }) => {
    try {
        const token = localStorage.getItem('user_token');

        const data = {
            hotel_id: hotelId,
            booking_id: bookingId,
            rating: rate,
            comment,
        };

        const res = await axios.post(`${API_URL}/reviews/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
