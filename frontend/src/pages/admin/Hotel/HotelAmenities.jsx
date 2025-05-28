import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Hotel.module.scss';
import Carousel from 'react-multi-carousel';
import Image from '@/components/Image';
import { getAmenities } from '../../../services/AmenityService';

const cx = classNames.bind(styles);

const HotelAmenities = ({ amenityIds = [], setAmenityIds }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [amenities, setAmenities] = useState({});

    const fetchAmenities = async () => {
        setLoading(true);
        const res = await getAmenities();
        console.log(res);
        if (res.success && res.amenities) {
            setAmenities(res.amenities);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAmenities();
    }, []);

    return (
        <div className={cx('hotel-amenities')}>
            <div className={cx('amenity-container')}>
                <div className={cx('amenity-title')}>View khách sạn</div>
                {amenities?.view && amenities.view.length > 0 && (
                    <div className={cx('amnity-list')}>
                        {amenities.view.map((a) => (
                            <label key={a.id} className={cx('checkbox-item')}>
                                <input
                                    type="checkbox"
                                    value={a.id}
                                    checked={amenityIds.includes(a.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAmenityIds([...amenityIds, a.id]);
                                        } else {
                                            setAmenityIds(amenityIds.filter((id) => id !== a.id));
                                        }
                                    }}
                                />
                                {a.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className={cx('amenity-container')}>
                <div className={cx('amenity-title')}>Tiện ích tổng quan</div>
                {amenities?.general && amenities.general.length > 0 && (
                    <div className={cx('amnity-list')}>
                        {amenities.general.map((a) => (
                            <label key={a.id} className={cx('checkbox-item')}>
                                <input
                                    type="checkbox"
                                    value={a.id}
                                    checked={amenityIds.includes(a.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAmenityIds([...amenityIds, a.id]);
                                        } else {
                                            setAmenityIds(amenityIds.filter((id) => id !== a.id));
                                        }
                                    }}
                                />
                                {a.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className={cx('amenity-container')}>
                <div className={cx('amenity-title')}>Tiện nghi phòng</div>
                {amenities?.bathroom && amenities.bathroom.length > 0 && (
                    <div className={cx('amnity-list')}>
                        {amenities.bathroom.map((a) => (
                            <label key={`bathroom-${a.id}`} className={cx('checkbox-item')}>
                                <input
                                    type="checkbox"
                                    value={a.id}
                                    checked={amenityIds.includes(a.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAmenityIds([...amenityIds, a.id]);
                                        } else {
                                            setAmenityIds(amenityIds.filter((id) => id !== a.id));
                                        }
                                    }}
                                />
                                {a.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelAmenities;
