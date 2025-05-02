import classNames from 'classnames/bind';

import styles from './BookingHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartShopping, faCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const BookingHeader = ({ step }) => {
    return (
        <div className={cx('booking-header')}>
            <div className={cx('header-left')}>
                <div className={cx('title')}>Đặt phòng của bạn</div>
                <div className={cx('description')}>
                    Hãy đảm bảo tất cả thông tin chi tiết trên trang này đã chính xác trước khi tiến hành thanh toán.
                </div>
            </div>

            <div className={cx('header-right')}>
                <div className={cx('step-item', { active: step >= 1 })}>
                    <div className={cx('step-icon')}>
                        <div className={cx('step-circle')}>
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                    </div>
                    <span className={cx('title')}>Đặt phòng và dịch vụ</span>
                </div>

                <div className={cx('step-item', { active: step >= 2 })}>
                    <div className={cx('step-icon')}>
                        <div className={cx('step-circle')}>
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                    </div>
                    <span className={cx('title')}>Thanh toán</span>
                </div>

                <div className={cx('step-item', { active: step >= 3 })}>
                    <div className={cx('step-icon')}>
                        <div className={cx('step-circle')}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <span className={cx('title')}>Hoàn thành</span>
                </div>
            </div>
        </div>
    );
};

export default BookingHeader;
