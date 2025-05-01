import { useEffect, useState } from 'react';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Booking.module.scss';
import { getDate } from '@/utils/dateUtil';
import BookingHeader from './components/BookingHeader/BookingHeader';
import config from '@/config';
import BookingOrder from './components/BookingOrder/BookingOrder';

const cx = classNames.bind(styles);

const Booking = () => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);

    console.log(currentStep);

    useEffect(() => {
        if (matchPath(config.routes.user.booking, location.pathname)) {
            setCurrentStep(1);
        } else if (matchPath(config.routes.user.payment, location.pathname)) {
            setCurrentStep(2);
        } else if (matchPath(config.routes.user.confirm, location.pathname)) {
            setCurrentStep(3);
        }
    }, [location.pathname]);

    return (
        <div className={cx('booking-page')}>
            <BookingHeader step={currentStep} />
            <div className={cx('booking-body')}>{currentStep === 1 && <BookingOrder />}</div>
        </div>
    );
};

export default Booking;
