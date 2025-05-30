import classNames from 'classnames/bind';

import styles from './BookingPayment.module.scss';
import BookingInfo from '../BookingOrder/BookingInfo/BookingInfo';
import { useEffect, useState } from 'react';
import { getBooking } from '@/services/BookingService';
import Payment from './Payment';

const cx = classNames.bind(styles);

const BookingPayment = ({ countDownTime, setBookingId, total }) => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const bookingId = localStorage.getItem('pending_booking_id');

        const fetchBooking = async () => {
            setLoading(true);
            try {
                const res = await getBooking({ id: bookingId, services: false, user: false });
                if (res.success) {
                    setBooking(res.booking);
                } else {
                    setError(res.message);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (bookingId) fetchBooking();
    }, []);

    return (
        <div className={cx('booking-payment')}>
            <Payment countDownTime={countDownTime} setBookingId={setBookingId} total={total} />

            <div className={cx('booking-right')}>
                {booking && (
                    <BookingInfo
                        hotel={booking.hotel}
                        room={booking.room.room_type}
                        voucher={booking.voucher}
                        checkIn={booking.check_in}
                        checkOut={booking.check_out}
                        voucherInput={false}
                        finalAmout={booking.total_amount}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingPayment;
