import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const createBooking = async ({ roomTypeId, checkIn, checkOut, voucherId }) => {
    try {
        const token = localStorage.getItem('user_token');

        const data = {
            room_type_id: roomTypeId,
            check_in: checkIn,
            check_out: checkOut,
            voucher_id: voucherId || null,
        };

        const res = await axios.post(`${API_URL}/bookings/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        res.data.success = true;
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getBooking = async ({
    id = '',
    user = true,
    hotel = true,
    room = true,
    services = true,
    voucher = true,
}) => {
    const query = new URLSearchParams({
        user,
        hotel,
        room,
        services,
        voucher,
    });

    const token = localStorage.getItem('user_token');

    try {
        const res = await axios.get(`${API_URL}/bookings/detail/${id}?${query.toString()}`, {
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

export const updateBooking = async (id, updateData) => {
    const token = localStorage.getItem('user_token') || localStorage.getItem('admin_token');

    try {
        const res = await axios.post(`${API_URL}/bookings/update/${id}`, updateData, {
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
