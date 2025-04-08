import classNames from 'classnames/bind';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './HotelItemSlider.module.scss';
import { HotelCard } from '../../Card';

const cx = classNames.bind(styles);

const responsive = {
    desktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 5,
    },
    laptop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 4,
    },
    minitablet: {
        breakpoint: { max: 768, min: 480 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 2,
    },
};

const HotelItemSlider = ({ hotels = [] }) => {
    return (
        <div className={cx('hotel-item-slider')}>
            <Carousel responsive={responsive} infinite={true} removeArrowOnDeviceType={['minitablet', 'mobile']}>
                {hotels.length > 0 && hotels.map((hotel) => <HotelCard key={`hotel-${hotel.id}`} hotel={hotel} />)}
            </Carousel>
        </div>
    );
};

export default HotelItemSlider;
