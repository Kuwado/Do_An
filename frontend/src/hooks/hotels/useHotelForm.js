import { useState } from 'react';

const initialHotelData = {
    name: '',
    avatar: '',
    images: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    rating: '',
};

const useHotelForm = (initialData = initialHotelData) => {
    const [hotel, setHotel] = useState(initialData);
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setHotel((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField(name, value);
    };

    const resetForm = () => {
        setHotel(initialHotelData);
        setErrors({});
    };

    const validate = () => {
        const newErrors = {};
        if (!hotel.name) newErrors.name = 'Tên khách sạn không được để trống';
        if (!hotel.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
        if (!hotel.email) newErrors.email = 'Email là bắt buộc';
        if (hotel.rating && (hotel.rating < 0 || hotel.rating > 5)) newErrors.rating = 'Rating phải từ 0 đến 5';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        hotel,
        setHotel,
        setField,
        handleChange,
        resetForm,
        validate,
        errors,
    };
};

export default useHotelForm;
