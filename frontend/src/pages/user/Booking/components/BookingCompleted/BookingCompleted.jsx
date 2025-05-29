import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingCompleted.module.scss';
import { Button } from '@/components/Button';
import { updateBooking } from '@/services/BookingService';

const cx = classNames.bind(styles);

const BookingCompleted = () => {
    const { hotelId } = useParams();
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        const pendingId = localStorage.getItem('pending_booking_id');
        if (pendingId) {
            setBookingId(pendingId);
            localStorage.removeItem('pending_booking_id');
            localStorage.removeItem('booking_created_at');
        }

        const amount = localStorage.getItem('amount');
        const paidBooking = async () => {
            const res = await updateBooking(pendingId, { paid_amount: amount, status: 'confirmed' });
            if (!res.success) {
                alert(res.message);
            } else {
                localStorage.removeItem('amount');
            }
        };

        if (amount && pendingId) {
            paidBooking();
        }
    }, []);

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
