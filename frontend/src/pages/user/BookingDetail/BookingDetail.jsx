import classNames from 'classnames/bind';

import styles from './BookingDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import BookingInfo from './components/BookingInfo/BookingInfo';
import ServiceBooking from './components/ServiceBooking/ServiceBooking';
import BookingPayment from './components/BookingPayment/BookingPayment';
import { getBooking } from '@/services/BookingService';
import { getServiceBookingsByBookingId } from '@/services/ServiceHotelService';
import BookingReview from './components/BookingReview/BookingReview';

const cx = classNames.bind(styles);

const BookingDetail = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState({});
    const [bookedServices, setBookedServices] = useState([]);
    const [pendingServices, setPendingServices] = useState([]);
    const [allBookedServices, setAllBookedServices] = useState([]);
    const [chosenType, setChosenType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const bookingRef = useRef(null);
    const servicesRef = useRef(null);
    const paymentRef = useRef(null);
    const reviewRef = useRef(null);

    const fetchBooking = async () => {
        setLoading(true);
        const res = await getBooking({ id, user: false });
        if (!res.success) {
            setError(res.message);
        } else {
            setBooking(res.booking);
            setError(null);
        }
    };

    const fetchBookedServiceBooking = async () => {
        setLoading(true);
        const res = await getServiceBookingsByBookingId({
            bookingId: id,
            status: 'confirmed',
            type: chosenType,
        });
        if (!res.success) {
            setError(res.message);
        } else {
            setError(null);
            setBookedServices(res.services);
        }
    };

    const fetchPendingServiceBooking = async () => {
        setLoading(true);
        const res = await getServiceBookingsByBookingId({ bookingId: id, status: 'pending' });
        if (!res.success) {
            setError(res.message);
        } else {
            setError(null);
            setPendingServices(res.services);
        }
    };

    const fetchAllServiceBookings = async () => {
        setLoading(true);
        const res = await getServiceBookingsByBookingId({
            bookingId: id,
            status: 'confirmed',
        });
        if (!res.success) {
            setError(res.message);
        } else {
            setError(null);
            setAllBookedServices(res.services);
        }
    };

    const fetchServiceBookings = () => {
        fetchBookedServiceBooking();
        fetchPendingServiceBooking();
        fetchAllServiceBookings();
    };

    useEffect(() => {
        fetchBooking();
        fetchServiceBookings();
    }, [id]);

    useEffect(() => {
        fetchBookedServiceBooking();
    }, [chosenType]);

    return (
        <div className={cx('booking-detail-page')}>
            <Header
                booking={booking}
                bookingRef={bookingRef}
                servicesRef={servicesRef}
                paymentRef={paymentRef}
                reviewRef={reviewRef}
                fetchServiceBookings={fetchServiceBookings}
            />

            <div className={cx('content')}>
                <div className={cx('title')}>Thông tin booking</div>

                <BookingInfo forwardedRef={bookingRef} booking={booking} onUpdate={fetchBooking} />

                <ServiceBooking
                    forwardedRef={servicesRef}
                    bookedServices={bookedServices}
                    pendingServices={pendingServices}
                    chosenType={chosenType}
                    setChosenType={setChosenType}
                    fetchPendingServiceBooking={fetchPendingServiceBooking}
                />

                <BookingPayment forwardedRef={paymentRef} booking={booking} services={allBookedServices} />

                {booking.status === 'completed' && (
                    <BookingReview forwardedRef={reviewRef} booking={booking} fetchBooking={fetchBooking} />
                )}
            </div>
        </div>
    );
};

export default BookingDetail;
