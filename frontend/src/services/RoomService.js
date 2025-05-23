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
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getRooms = async ({
    roomTypeId = '',
    number = '',
    checkIn = '',
    checkOut = '',
    filter = '', // booked, available, maintenance, active
    page = 1,
    limit = '',
}) => {
    try {
        const query = new URLSearchParams({
            roomTypeId,
            number,
            checkIn,
            checkOut,
            filter,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const res = await axios.get(`${API_URL}/rooms?${query}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getRoomType = async ({ id, checkIn = '', checkOut = '' }) => {
    const query = new URLSearchParams({
        checkIn,
        checkOut,
    });

    try {
        const res = await axios.get(`${API_URL}/rooms/types/${id}?${query.toString()}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const getRoom = async ({ id }) => {
    try {
        const res = await axios.get(`${API_URL}/rooms/${id}`);
        return res.data;
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.error
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};

export const createRoomType = async ({ name, images = [], description, price, capacity = 1, area }) => {
    try {
        const token = localStorage.getItem('admin_token');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('capacity', capacity);
        formData.append('area', area);

        // Thêm từng ảnh vào formData
        if (images.length > 0) {
            images.forEach((image, index) => {
                formData.append('images', image);
            });
        }

        const res = await axios.post(`${API_URL}/rooms/types/create`, formData, {
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

export const createRoom = async ({ roomNumber, roomTypeId }) => {
    const token = localStorage.getItem('admin_token');

    try {
        const data = {
            room_number: roomNumber,
            room_type_id: roomTypeId,
        };

        const res = await axios.post(`${API_URL}/rooms/create`, data, {
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

export const updateRoomType = async (id, updateData) => {
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

    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    try {
        const res = await axios.post(`${API_URL}/rooms/types/update/${id}`, formData, {
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

export const updateRoom = async (id, updateData) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.post(`${API_URL}/rooms/update/${id}`, updateData, {
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

export const deleteRoomType = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.delete(`${API_URL}/rooms/types/delete/${id}`, {
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

export const deleteRoom = async (id) => {
    const token = localStorage.getItem('admin_token');

    try {
        const res = await axios.delete(`${API_URL}/rooms/delete/${id}`, {
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
