import { useEffect, useState } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingDetail.module.scss';
import { IconButton } from '@/components/Button';
import { getRoomType } from '../../../services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import config from '@/config';
import { getBookingByAdmin } from '../../../services/BookingService';
import UserProfile from './components/UserProfile';
import BookingInfo from './components/BookingInfo';
import ServiceBookings from './components/ServiceBookings';
import RoomInfo from './components/RoomInfo';

const cx = classNames.bind(styles);

const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    const fetchBooking = async () => {
        const res = await getBookingByAdmin({ bookingId: id });
        if (res.success) {
            setBooking(res.booking);
        }
    };

    useEffect(() => {
        if (id) fetchBooking();
    }, [id]);

    return (
        <div className={cx('booking-page')}>
            <div className={cx('booking-title-container')}>
                <div className={cx('booking-title')}>Đơn đặt phòng #{booking?.id}</div>
                <IconButton className={cx('back-btn')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </IconButton>
            </div>

            <div className={cx('booking-content')}>
                <div className={cx('left-content')}>
                    {booking && booking.user && <UserProfile user={booking.user} />}

                    {booking && booking.room && <RoomInfo room={booking.room} />}
                </div>

                {booking && <BookingInfo booking={booking} fetchBooking={fetchBooking} />}

                {booking && booking.service_bookings && <ServiceBookings serviceBookings={booking.service_bookings} />}
            </div>
        </div>
    );
};

export default BookingDetail;
