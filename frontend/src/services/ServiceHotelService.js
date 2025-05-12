import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getServicesByHotelId = async ({ hotelId = '' }) => {
    try {
        const res = await axios.get(`${API_URL}/services/hotel/${hotelId}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getServiceBookingsByBookingId = async ({ bookinglId = '', status = '', type = '' }) => {
    try {
        const query = new URLSearchParams({
            status,
            type,
        }).toString();

        const res = await axios.get(`${API_URL}/services/booking/${bookinglId}?${query}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
