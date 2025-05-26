import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUser = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/users/${id}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createUser = async ({ username, password, firstName, lastName, phone }) => {
    try {
        const data = {
            username,
            password,
            first_name: firstName,
            last_name: lastName,
            phone,
        };

        const res = await axios.post(`${API_URL}/users/create`, data);

        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const updateUser = async (id, updateData) => {
    const token = localStorage.getItem('user_token');

    const formData = new FormData();

    for (const key in updateData) {
        formData.append(key, updateData[key]);
    }

    try {
        const res = await axios.post(`${API_URL}/users/update/${id}`, formData, {
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

export const getUserByPhone = async (phone) => {
    try {
        const res = await axios.get(`${API_URL}/users/phone/${phone}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
