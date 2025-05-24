import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const checkVoucher = async ({ hotelId = '', code = '', type = '', originalPrice = 0 }) => {
    const token = localStorage.getItem('user_token');

    try {
        const response = await axios.get(`${API_URL}/vouchers/check`, {
            params: { hotelId, code, type, originalPrice },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        response.data.success = true;
        return response.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getVouchers = async ({
    hotelId = '',
    type = '',
    discountType = '',
    status = 'active',
    sortDate = '',
    page = 1,
    limit = 10,
}) => {
    try {
        const query = new URLSearchParams({
            hotelId,
            type,
            discountType,
            status,
            sortDate,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const res = await axios.get(`${API_URL}/vouchers?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getVoucher = async ({ id }) => {
    try {
        const res = await axios.get(`${API_URL}/vouchers/${id}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createVoucher = async ({ code, name, type, description, discount, discountType, startDate, endDate }) => {
    try {
        const token = localStorage.getItem('admin_token');

        const formData = new FormData();
        formData.append('code', code);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('discount', discount);
        formData.append('discount_type', discountType);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);

        const res = await axios.post(`${API_URL}/vouchers/create`, formData, {
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

export const updateVoucher = async (id, updateData) => {
    const token = localStorage.getItem('admin_token');

    const formData = new FormData();

    for (const key in updateData) {
        formData.append(key, updateData[key]);
    }

    try {
        const res = await axios.post(`${API_URL}/vouchers/update/${id}`, formData, {
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

export const deleteVoucher = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.delete(`${API_URL}/vouchers/delete/${id}`, {
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
