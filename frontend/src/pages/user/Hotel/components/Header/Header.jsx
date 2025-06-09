import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTurnUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import { DateInput } from '@/components/Input';
import { Button } from '@/components/Button';
import { getDate } from '@/utils/dateUtil';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = ({ overviewRef, roomsRef, vouchersRef, reviewsRef, checkIn, checkOut, setCheckIn, setCheckOut }) => {
    const navigate = useNavigate();
    const [section, setSection] = useState('overview');
    const sectionRefs = [
        { id: 'overview', ref: overviewRef },
        { id: 'rooms', ref: roomsRef },
        { id: 'vouchers', ref: vouchersRef },
        { id: 'reviews', ref: reviewsRef },
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
        params.set('checkIn', checkIn);
        params.set('checkOut', checkOut);
        navigate(`?${params.toString()}`);
    };

    return (
        <div className={cx('header-container')}>
            <div className={cx('navigation-bar')}>
                <div
                    className={cx('navigation-item', { active: section === 'overview' })}
                    onClick={() => handleScroll(overviewRef)}
                >
                    Tổng quan
                </div>
                <div
                    className={cx('navigation-item', { active: section === 'rooms' })}
                    onClick={() => handleScroll(roomsRef)}
                >
                    Phòng
                </div>
                <div
                    className={cx('navigation-item', { active: section === 'vouchers' })}
                    onClick={() => handleScroll(vouchersRef)}
                >
                    Voucher
                </div>
                <div
                    className={cx('navigation-item', { active: section === 'reviews' })}
                    onClick={() => handleScroll(reviewsRef)}
                >
                    Đánh giá
                </div>
            </div>

            <div className={cx('date-selection')}>
                <div className={cx('check-in')}>
                    <DateInput id="in-input" value={checkIn} setValue={setCheckIn} label="Ngày nhận" />
                </div>
                <div className={cx('check-out')}>
                    <DateInput id="out-input" value={checkOut} setValue={setCheckOut} label="Ngày trả" />
                </div>
                <Button
                    secondary
                    curved
                    className={cx('search-btn')}
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    onClick={handleSearchByDate}
                >
                    Tìm kiếm
                </Button>
            </div>

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
