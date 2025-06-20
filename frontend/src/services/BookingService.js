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

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createBookingByAdmin = async ({ roomId, userId, checkIn, checkOut, voucherId }) => {
    try {
        const token = localStorage.getItem('admin_token');

        const data = {
            room_id: roomId,
            user_id: userId,
            check_in: checkIn,
            check_out: checkOut,
            voucher_id: voucherId || null,
        };

        const res = await axios.post(`${API_URL}/bookings/create-by-admin`, data, {
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

export const createServiceBooking = async ({ bookingId, serviceId, quantity, voucherId, date }) => {
    try {
        const token = localStorage.getItem('user_token');

        const data = {
            booking_id: bookingId,
            service_id: serviceId,
            quantity,
            voucher_id: voucherId || null,
            date,
        };

        const res = await axios.post(`${API_URL}/bookings/service/create`, data, {
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

export const getBooking = async ({
    id = '',
    user = true,
    hotel = true,
    room = true,
    services = true,
    voucher = true,
    review = true,
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

export const getBookingsByUserId = async ({ userId = '', hotel = true, room = true, page = 1, limit = 10 }) => {
    const query = new URLSearchParams({
        hotel,
        room,
        page,
        limit,
    });

    const token = localStorage.getItem('user_token');

    try {
        const res = await axios.get(`${API_URL}/bookings/user/${userId}?${query.toString()}`, {
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

export const getBookingsByHotelId = async ({
    hotelId = '',
    name = '',
    status = '',
    sortDate = '',
    page = 1,
    limit = '',
}) => {
    const query = new URLSearchParams({
        name,
        status,
        sortDate,
        page,
        limit,
    });

    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.get(`${API_URL}/bookings/hotel/${hotelId}?${query.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const getBookingByAdmin = async ({ bookingId }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.get(`${API_URL}/bookings/by-admin/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const confirmBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/bookings/update/${id}`,
            { status: 'confirmed' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const checkedInBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/bookings/update/${id}`,
            { status: 'using', checked_in_at: new Date() },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const cancelBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/bookings/update/${id}`,
            { status: 'cancelled' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const completeBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/bookings/update/${id}`,
            { status: 'completed' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
