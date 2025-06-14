import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faLocationDot, faMountainCity, faPersonBooth } from '@fortawesome/free-solid-svg-icons';

import styles from './HotelItem.module.scss';
import FullScreenSlider from '../../Slider/FullScreen/FullScreenSlider';
import images from '@/assets/images';
import Rating from '../../Rating/Rating';
import { Button } from '@/components/Button';
import { formatPrice } from '@/utils/stringUtil';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const IMAGES = [images.hotel, images.hotel, images.hotel, images.hotel];

const HotelItem = ({ hotel, className }) => {
    const location = useLocation();
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setCheckIn(params.get('checkIn'));
        setCheckOut(params.get('checkOut'));
    }, [location.search]);

    return (
        <div className={cx('hotel-item-card', { [className]: className })}>
            <div className={cx('left')}>
                <FullScreenSlider
                    className="hover card"
                    images={hotel.images || IMAGES}
                    height="100%"
                    autoPlay={false}
                    link={hotel.images ? true : false}
                />
            </div>
            <div className={cx('center')}>
                <div className={cx('name')}>{hotel.name}</div>

                <Rating rate={hotel.rating} />

                <div className={cx('address')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    {hotel.address}
                </div>

                <div className={cx('tag-container')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faMountainCity} />
                    </div>
                    {hotel.amenities.view.length > 0 &&
                        hotel.amenities.view.map((view) => (
                            <div key={`view-tag-${view.id}`} className={cx('tag')}>
                                {view.name}
                            </div>
                        ))}
                </div>

                <div className={cx('tag-container')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faPersonBooth} />
                    </div>
                    {hotel.amenities.general.length > 0 &&
                        hotel.amenities.general.map((general) => (
                            <div key={`general-tag-${general.id}`} className={cx('tag')}>
                                {general.name}
                            </div>
                        ))}
                </div>

                <div className={cx('tag-container')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faBath} />
                    </div>
                    {hotel.amenities.bathroom.length > 0 &&
                        hotel.amenities.bathroom.map((bathroom) => (
                            <div key={`bathroom-tag-${bathroom.id}`} className={cx('tag')}>
                                {bathroom.name}
                            </div>
                        ))}
                </div>

                <div
                    className={cx('des')}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {hotel.description} {hotel.description} {hotel.description}
                </div>
            </div>

            <div className={cx('right')}>
                <div className={cx('city')}>{hotel.city}</div>

                <div className={cx('price')}>{formatPrice(hotel.min_price)}</div>

                <Button secondary small to={`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}`}>
                    Chọn phòng
                </Button>
            </div>
        </div>
    );
};

export default HotelItem;
