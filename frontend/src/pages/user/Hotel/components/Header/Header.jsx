import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTurnUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import SearchBar from '@/constants/Search';

const cx = classNames.bind(styles);

const Header = ({ overviewRef, roomsRef, vouchersRef, reviewsRef }) => {
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

    return (
        <div className={cx('header-container')}>
            <SearchBar />
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
                <div className={cx('top-btn')} onClick={scrollToTop}>
                    <div className={cx('content')}>
                        <div> Lên đầu trang</div>
                        <FontAwesomeIcon icon={faTurnUp} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
