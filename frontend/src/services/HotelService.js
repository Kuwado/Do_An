import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getHotels = async ({
    name = '',
    city = '',
    amenity = false,
    room = false,
    page = 1,
    limit = 10,
    sortPrice = '',
    sortRating = '',
}) => {
    try {
        const query = new URLSearchParams({
            name,
            city,
            amenity: amenity.toString(),
            room: room.toString(),
            page: page.toString(),
            limit: limit.toString(),
            sortPrice,
            sortRating,
        }).toString();

        const res = await axios.get(`${API_URL}/hotels?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getCities = async () => {
    try {
        const res = await axios.get(`${API_URL}/cities`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
