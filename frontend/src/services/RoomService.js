import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRoomTypes = async ({
    hotelId = '',
    name = '',
    checkIn = '',
    checkOut = '',
    rooms = false,
    page = 1,
    limit = '',
}) => {
    try {
        const query = new URLSearchParams({
            hotelId,
            name,
            checkIn,
            checkOut,
            rooms: rooms.toString(),
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const res = await axios.get(`${API_URL}/rooms/types?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getRoomType = async ({ id, checkIn, checkOut, rooms = false }) => {
    const query = new URLSearchParams({
        checkIn,
        checkOut,
        rooms,
    });

    try {
        const res = await axios.get(`${API_URL}/rooms/types/${id}?${query.toString()}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
