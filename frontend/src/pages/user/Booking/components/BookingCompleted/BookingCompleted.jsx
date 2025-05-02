import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingCompleted.module.scss';
import { Button } from '@/components/Button';

const cx = classNames.bind(styles);

const BookingCompleted = ({ bookingId }) => {
    const { hotelId } = useParams();

    return (
        <div className={cx('booking-completed')}>
            <div>Đặt phòng thành công. Cảm ơn quý khách đã sử dụng dịch vụ</div>
            <div className={cx('action-btns')}>
                <Button transparent primaryBorder width="150px" to={`/hotels/${hotelId}`}>
                    Đặt tiếp
                </Button>
                {bookingId && (
                    <Button secondary width="150px" to={`/bookings/${bookingId}`}>
                        Xem đơn đặt
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BookingCompleted;
