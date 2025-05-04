import classNames from 'classnames/bind';

import styles from './BookingList.module.scss';
import useProfile from '../../../hooks/profile/useProfile';
import { useEffect, useState } from 'react';
import { getBookingsByUserId } from '../../../services/BookingService';
import BookingCard from '../../../constants/Card/Booking/BookingCard';
import { useLocation } from 'react-router-dom';
import Pagination from '@/constants/Pagination';
const cx = classNames.bind(styles);

const BookingList = () => {
    const { user } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [bookings, setBookings] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const page = params.get('page') || 1;
        const fetchBookings = async () => {
            setLoading(true);
            const res = await getBookingsByUserId({ userId: user.id, page });
            if (!res.success) {
                setError(res.message);
            } else {
                setBookings(res.bookings);
                setTotalItems(res.totalItems);
                setTotalPages(res.totalPages);
                setError(null);
            }
            setLoading(false);
        };

        if (user && user.id) fetchBookings();
    }, [user, location.search]);

    return (
        <div className={cx('booking-list-page')}>
            <div className={cx('title')}>Đặt phòng của tôi</div>
            <div className={cx('booking-list')}>
                {bookings &&
                    bookings.length > 0 &&
                    bookings.map((booking) => <BookingCard key={`booking-${booking.id}`} booking={booking} />)}
            </div>
            <Pagination total={totalPages} />
        </div>
    );
};

export default BookingList;
