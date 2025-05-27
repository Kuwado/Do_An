import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faChevronDown,
    faChevronUp,
    faClipboardList,
    faHeart,
    faMoneyBillWave,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './AvatarBar.module.scss';
import Image from '@/components/Image';
import config from '@/config';
import images from '@/assets/images';
import useProfile from '@/hooks/profile/useProfile';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const AvatarBar = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const avatarRef = useRef(null);
    const { user, logout } = useProfile();
    const [avatarUrl, setAvatarUrl] = useState('');

    console.log(avatarUrl);

    const handleLogout = () => {
        logout();
        navigate(config.routes.user.login);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (avatarRef.current && !avatarRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user.avatar) setAvatarUrl(`${IMAGE_URL}${user.avatar}`);
    }, [user.avatar]);

    return (
        <div className={cx('avatar-bar', { active: show })} ref={avatarRef} onClick={() => setShow((prev) => !prev)}>
            <div className={cx('header')}>
                <Image src={avatarUrl} alt="avatar" />
                <div className={cx('header-icon')}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-header')}>
                    <Image className={cx('avatar')} src={avatarUrl} alt="avatar" curved />
                    <span className={cx('user-name')}>
                        {user.first_name} {user.last_name}
                    </span>
                </div>

                <Link to={config.routes.user.profile} className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={cx('item-title')}>Thông tin người dùng</span>
                </Link>

                <Link to={config.routes.user.bookingList} className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                    </div>
                    <span className={cx('item-title')}>Đặt phòng của tôi</span>
                </Link>

                <Link to="/" className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                    </div>
                    <span className={cx('item-title')}>Giao dịch của tôi</span>
                </Link>

                <Link to="/" className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <span className={cx('item-title')}>Khách sạn yêu thích</span>
                </Link>

                <Link to="/" className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faTicket} />
                    </div>
                    <span className={cx('item-title')}>Phiếu giảm giá của tôi</span>
                </Link>

                <Link to={config.routes.user.login} className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                    <span className={cx('item-title')} onClick={handleLogout}>
                        Đăng xuất
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default AvatarBar;
