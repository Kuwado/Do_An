import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAmenities = async () => {
    try {
        const res = await axios.get(`${API_URL}/amenities`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getAmenitiesByHotelId = async ({ hotelId = '' }) => {
    try {
        const res = await axios.get(`${API_URL}/amenities/hotel/${hotelId}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getAmenitiesByRoomTypeId = async ({ roomTypeId = '' }) => {
    try {
        const res = await axios.get(`${API_URL}/amenities/room/${roomTypeId}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const updateHotelAmenities = async ({ hotelId = '', amenityIds = [] }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/amenities/hotel/${hotelId}/update`,
            { amenityIds },
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
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const updateRoomTypeAmenities = async ({ roomTypeId = '', amenityIds = [] }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(
            `${API_URL}/amenities/room/${roomTypeId}/update`,
            { amenityIds },
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
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
