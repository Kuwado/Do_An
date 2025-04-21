import { useEffect, useState } from 'react';
import { getCities, getHotels } from '../../services/HotelService';

const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [hotelNames, setHotelNames] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const res = await getHotels({});
            const hotelsData = res.hotels || [];
            setHotels(hotelsData);
            setHotelNames(hotelsData.map((hotel) => hotel.name));
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCities = async () => {
        setLoading(true);
        try {
            const res = await getCities();
            setCities(res.cities || []);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
        fetchCities();
    }, []);

    return {
        hotels,
        hotelNames,
        cities,
        loading,
        error,
        fetchHotels,
    };
};

export default useHotels;
