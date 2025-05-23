import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImages = async (images = []) => {
    const formData = new FormData();

    images.forEach((image) => {
        formData.append('images', image);
    });

    try {
        const res = await axios.post(`${API_URL}/uploads/images`, formData, {
            headers: {
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
