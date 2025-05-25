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

export const getServiceBookingsByBookingId = async ({ bookingId = '', status = '', type = '' }) => {
    try {
        const query = new URLSearchParams({
            status,
            type,
        }).toString();

        const res = await axios.get(`${API_URL}/services/booking/${bookingId}?${query}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const updateServiceBooking = async (id, updateData) => {
    const token = localStorage.getItem('user_token') || localStorage.getItem('admin_token');

    try {
        const res = await axios.post(`${API_URL}/services/booking/update/${id}`, updateData, {
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

export const getServiceBookingsHistory = async ({ bookingId = '', serviceId = '' }) => {
    try {
        const res = await axios.get(`${API_URL}/services/history/${serviceId}/${bookingId}`);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

// CRUD
export const getAllServicesByHotelId = async ({
    hotelId = '',
    name = '',
    category = '',
    sortPrice = '',
    page = 1,
    limit = '',
}) => {
    try {
        const query = new URLSearchParams({
            name,
            category,
            sortPrice,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const res = await axios.get(`${API_URL}/services/hotel/${hotelId}/all?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getService = async ({ id }) => {
    try {
        const res = await axios.get(`${API_URL}/services/${id}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createService = async ({ name, images = [], description, category, price }) => {
    try {
        const token = localStorage.getItem('admin_token');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);

        // Thêm từng ảnh vào formData
        if (images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        const res = await axios.post(`${API_URL}/services/create`, formData, {
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

export const updateService = async (id, updateData) => {
    const token = localStorage.getItem('admin_token');

    const formData = new FormData();

    for (const key in updateData) {
        if (key === 'images' && updateData.images?.length > 0) {
            updateData.images.forEach((img) => {
                if (img instanceof File) {
                    formData.append('images', img);
                }
            });
        } else {
            formData.append(key, updateData[key]);
        }
    }

    try {
        const res = await axios.post(`${API_URL}/services/update/${id}`, formData, {
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

export const deleteService = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.delete(`${API_URL}/services/delete/${id}`, {
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

//
export const getServiceBookingsByHotelId = async ({
    hotelId = '',
    name = '',
    status = '',
    category = '',
    sortDate = '',
    page = 1,
    limit = '',
}) => {
    const query = new URLSearchParams({
        name,
        status,
        category,
        sortDate,
        page,
        limit,
    });

    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.get(`${API_URL}/bookings/services/hotel/${hotelId}?${query.toString()}`, {
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

export const confirmServiceBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/services/booking/update/${id}`,
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

export const cancelServiceBooking = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/services/booking/update/${id}`,
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
