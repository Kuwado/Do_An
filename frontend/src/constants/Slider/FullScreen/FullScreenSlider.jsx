import classNames from 'classnames/bind';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './FullScreenSlider.module.scss';
import Image from '@components/Image';
import { HotelCard } from '../../Card';

const cx = classNames.bind(styles);

const responsive = {
    desktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 1,
    },
    laptop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 1,
    },
    minitablet: {
        breakpoint: { max: 768, min: 480 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1,
    },
};

const FullScreenSlider = ({ images = [], height = '100vh' }) => {
    return (
        <div className={cx('full-screen-slider')} style={{ height }}>
            <Carousel
                responsive={responsive}
                infinite={true}
                showDots={true}
                autoPlay={true}
                autoPlaySpeed={7000}
                keyBoardControl={true}
                removeArrowOnDeviceType={['minitablet', 'mobile']}
            >
                {images.length > 0 &&
                    images.map((item, index) => (
                        <Image key={`Slide-${index}`} className={cx('slide-item')} src={item} />
                    ))}
            </Carousel>
        </div>
    );
};

export default FullScreenSlider;
