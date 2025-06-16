import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faTurnUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import { Button } from '@/components/Button';
import Popup from '@/components/Popup/Popup';
import ServiceSelection from '../ServiceSelection/ServiceSelection';

const cx = classNames.bind(styles);

const Header = ({ booking, bookingRef, servicesRef, paymentRef, reviewRef, fetchServiceBookings }) => {
    const navigate = useNavigate();
    const [section, setSection] = useState('booking');
    const [showServices, setShowServices] = useState(false);
    const sectionRefs = [
        { id: 'booking', ref: bookingRef },
        { id: 'services', ref: servicesRef },
        { id: 'payment', ref: paymentRef },
        { id: 'review', ref: reviewRef },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sectionRefs) {
                const element = section.ref.current;
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = (ref) => {
        if (ref.current) {
            const offsetTop = ref.current.offsetTop;
            const offset = window.innerHeight / 3;

            window.scrollTo({
                top: offsetTop - offset + 1,
                behavior: 'smooth',
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchByDate = () => {
        const params = new URLSearchParams();
        params.set('check_in', checkIn);
        params.set('check_out', checkOut);
        navigate(`?${params.toString()}`);
    };

    return (
        <div className={cx('header-container', { 'show-service': showServices })}>
            <div className={cx('navigation-bar')}>
                <div
                    className={cx('navigation-item', { active: section === 'booking' })}
                    onClick={() => handleScroll(bookingRef)}
                >
                    Thông tin phòng
                </div>
                <div
                    className={cx('navigation-item', { active: section === 'services' })}
                    onClick={() => handleScroll(servicesRef)}
                >
                    Dịch vụ
                </div>
                <div
                    className={cx('navigation-item', { active: section === 'payment' })}
                    onClick={() => handleScroll(paymentRef)}
                >
                    Thanh toán
                </div>
                {booking.status === 'completed' && (
                    <div
                        className={cx('navigation-item', { active: section === 'review' })}
                        onClick={() => handleScroll(reviewRef)}
                    >
                        Đánh giá
                    </div>
                )}
            </div>

            {booking.id &&
                (booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'using') && (
                    <div className={cx('service-btn')}>
                        <Button
                            secondary
                            leftIcon={<FontAwesomeIcon icon={faBellConcierge} />}
                            onClick={() => setShowServices(true)}
                        >
                            Thêm dịch vụ
                        </Button>

                        <Popup show={showServices} setShow={setShowServices}>
                            <ServiceSelection booking={booking} fetchServiceBookings={fetchServiceBookings} />
                        </Popup>
                    </div>
                )}

            <div className={cx('top-btn')} onClick={scrollToTop}>
                <div className={cx('content')}>
                    <div> Lên đầu trang</div>
                    <FontAwesomeIcon icon={faTurnUp} />
                </div>
            </div>
        </div>
    );
};

export default Header;
