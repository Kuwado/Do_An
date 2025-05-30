import { useEffect, useState } from 'react';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Booking.module.scss';
import BookingHeader from './components/BookingHeader/BookingHeader';
import config from '@/config';
import BookingOrder from './components/BookingOrder/BookingOrder';
import BookingPayment from './components/BookingPayment/BookingPayment';
import { Button } from '@/components/Button';
import BookingCompleted from './components/BookingCompleted/BookingCompleted';

const cx = classNames.bind(styles);

const COUNTDOWNTIME = 30;

const Booking = () => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (matchPath(config.routes.user.booking, location.pathname)) {
            setCurrentStep(1);
        } else if (matchPath(config.routes.user.payment, location.pathname)) {
            setCurrentStep(2);
        } else if (matchPath(config.routes.user.completed, location.pathname)) {
            setCurrentStep(3);
        }
    }, [location.pathname]);

    return (
        <div className={cx('booking-page')}>
            <BookingHeader step={currentStep} />
            <div className={cx('booking-body')}>
                {currentStep === 1 && <BookingOrder countDownTime={COUNTDOWNTIME} setTotal={setTotal} />}
                {currentStep === 2 && (
                    <BookingPayment countDownTime={COUNTDOWNTIME} setBookingId={setBookingId} total={total} />
                )}
                {currentStep === 3 && <BookingCompleted />}
            </div>
        </div>
    );
};

export default Booking;
