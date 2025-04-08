import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getVouchers = async ({
    hotelId = '',
    type = '',
    discountType = '',
    status = '',
    page = 1,
    limit = 10,
}) => {
    try {
        const query = new URLSearchParams({
            hotelId,
            type,
            discountType,
            status,
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
