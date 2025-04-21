import classNames from 'classnames/bind';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './VoucherSlider.module.scss';
import Voucher from '@/constants/Voucher';

const cx = classNames.bind(styles);

const responsive = {
    desktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 3,
    },
    laptop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
    },
    minitablet: {
        breakpoint: { max: 768, min: 480 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1,
    },
};
const VOUCHERS = [
    {
        id: 1,
        name: 'voucher nè',
        description: 'Voucher dành cho người mới, dùng được một lần duy nhất thôi nha',
        type: 'service',
        code: 'VIETHOAN0507',
    },
    {
        id: 2,
        name: 'voucher 2 nè',
        description: 'Voucher dành cho người mới, dùng được một lần duy nhất thôi nha',
        type: 'service',
        code: 'VIETHOAN0507',
    },
    {
        id: 3,
        name: 'voucher 3 nè',
        description: 'Voucher dành cho người mới, dùng được một lần duy nhất thôi nha',
        type: 'service',
        code: 'VIETHOAN0507',
    },
    {
        id: 4,
        name: 'voucher 4 nè',
        description: 'Voucher dành cho người mới, dùng được một lần duy nhất thôi nha',
        type: 'service',
        code: 'VIETHOAN0507',
    },
];

const VoucherSlider = ({ vouchers = VOUCHERS, id = '' }) => {
    return (
        <div className={cx('hotel-item-slider')}>
            <Carousel
                className="small"
                responsive={responsive}
                infinite={true}
                removeArrowOnDeviceType={['minitablet', 'mobile']}
            >
                {vouchers.length > 0 &&
                    vouchers.map((voucher) => <Voucher key={`voucher-${id}-${voucher.id}`} voucher={voucher} />)}
            </Carousel>
        </div>
    );
};

export default VoucherSlider;
