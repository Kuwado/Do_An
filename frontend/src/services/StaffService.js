import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const createStaff = async ({ username, password, firstName, lastName, role = 'staff', hotelId }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const data = {
            username,
            password,
            first_name: firstName,
            last_name: lastName,
            role,
            hotel_id: hotelId,
        };

        const res = await axios.post(`${API_URL}/staffs/create`, data, {
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

export const getStaff = async ({ id = '', hotel = true }) => {
    try {
        const res = await axios.get(`${API_URL}/staffs/${id}?hotel=${hotel}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getStaffsByHotelId = async ({ hotelId = '', name = '', role = '', page = 1, limit = 10 }) => {
    const query = new URLSearchParams({
        name,
        role,
        page,
        limit,
    });

    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.get(`${API_URL}/staffs/hotel/${hotelId}?${query.toString()}`, {
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

export const updateStaff = async (id, updateData) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(`${API_URL}/staff/update/${id}`, updateData, {
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

export const deleteStaff = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.delete(`${API_URL}/staffs/delete/${id}`, {
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
