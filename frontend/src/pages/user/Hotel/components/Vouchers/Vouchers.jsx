import classNames from 'classnames/bind';

import styles from './Vouchers.module.scss';
import VoucherSlider from '../../../../../constants/Slider/Voucher/VoucherSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Vouchers = ({ vouchers = [], forwardedRef }) => {
    return (
        <div ref={forwardedRef} className={cx('hotel-vouchers')}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faTicket} />
                <span>Danh sách voucher</span>
            </div>
            <div className={cx('content')}>
                {vouchers.length > 0 ? (
                    <VoucherSlider vouchers={vouchers} />
                ) : (
                    <div>Hiện tại chúng tôi chưa có mã giảm giá. Hãy chờ nhé.</div>
                )}
            </div>
        </div>
    );
};

export default Vouchers;
