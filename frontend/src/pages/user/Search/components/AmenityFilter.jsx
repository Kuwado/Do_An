import classNames from 'classnames/bind';

import styles from '../Search.module.scss';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selection from '@/constants/Filter/Selection/Selection';
import { getAmenities } from '@/services/AmenityService';

const cx = classNames.bind(styles);

const AmenityFilter = ({ amenities, setAmenities, setLoading, setError }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [amenitiesList, setAmenitiesList] = useState([]);

    useEffect(() => {
        const fetchAmenities = async () => {
            setLoading(true);
            try {
                const res = await getAmenities();
                setAmenitiesList(res.amenities);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAmenities();
    }, []);

    return (
        <>
            <Selection
                title="View phòng"
                id="view"
                selections={amenitiesList.view}
                selected={amenities}
                setSelected={setAmenities}
            />
            <Selection
                title="Tiện nghi cơ bản"
                id="general"
                selections={amenitiesList.general}
                selected={amenities}
                setSelected={setAmenities}
            />
            <Selection
                title="Tiện nghi phòng tắm"
                id="bathroom"
                selections={amenitiesList.bathroom}
                selected={amenities}
                setSelected={setAmenities}
            />
        </>
    );
};

export default AmenityFilter;
