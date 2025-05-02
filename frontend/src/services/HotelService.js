import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getHotels = async ({
    name = '',
    city = '',
    checkIn = '',
    checkOut = '',
    page = 1,
    limit = 10,
    sortPrice = '',
    sortRating = '',
}) => {
    try {
        const query = new URLSearchParams({
            name,
            city,
            check_in: checkIn,
            check_out: checkOut,
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

export const searchHotels = async ({
    city,
    check_in,
    check_out,
    quantity,
    people,
    from,
    to,
    amenities,
    page = 1,
    limit = 10,
    sortBy = '',
}) => {
    try {
        const query = new URLSearchParams();
        if (city) query.append('city', city);
        if (check_in) query.append('check_in', check_in);
        if (check_out) query.append('check_out', check_out);
        if (quantity) query.append('quantity', quantity.toString());
        if (people) query.append('people', people.toString());
        if (from) query.append('from', from.toString());
        if (to) query.append('to', to.toString());
        if (amenities) query.append('amenities', amenities.toString());
        if (page) query.append('page', page.toString());
        if (limit) query.append('limit', limit.toString());
        if (sortBy) query.append('sortBy', sortBy);

        const res = await axios.get(`${API_URL}/hotels/search?${query.toString()}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getHotel = async ({ id, checkIn, checkOut }) => {
    const query = new URLSearchParams({
        check_in: checkIn,
        check_out: checkOut,
    });

    try {
        const res = await axios.get(`${API_URL}/hotels/${id}?${query.toString()}`);
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
