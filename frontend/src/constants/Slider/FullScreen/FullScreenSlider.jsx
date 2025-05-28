import classNames from 'classnames/bind';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './FullScreenSlider.module.scss';
import Image from '@components/Image';
import { HotelCard } from '../../Card';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const FullScreenSlider = ({
    images = [],
    height = '100vh',
    autoPlay = true,
    quantity = 1,
    link = false,
    className,
}) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: quantity,
        },
        laptop: {
            breakpoint: { max: 1280, min: 1024 },
            items: quantity,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: quantity,
        },
        minitablet: {
            breakpoint: { max: 768, min: 480 },
            items: quantity,
        },
        mobile: {
            breakpoint: { max: 480, min: 0 },
            items: quantity,
        },
    };

    return (
        <div className={cx('full-screen-slider', { [className]: className })} style={{ height }}>
            <Carousel
                responsive={responsive}
                infinite={true}
                showDots={true}
                autoPlay={autoPlay}
                autoPlaySpeed={7000}
                keyBoardControl={true}
                removeArrowOnDeviceType={['minitablet', 'mobile']}
            >
                {images.length > 0 &&
                    images.map((item, index) => (
                        <Image
                            key={`Slide-${index}`}
                            className={cx('slide-item')}
                            src={link ? `${IMAGE_URL}${item}` : item}
                        />
                    ))}
            </Carousel>
        </div>
    );
};

export default FullScreenSlider;
