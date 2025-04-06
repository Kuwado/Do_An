import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faChevronDown,
    faChevronUp,
    faClipboard,
    faClipboardList,
    faHeart,
    faMoneyBillWave,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './AvatarBar.module.scss';
import config from '@/config';
import images from '@/assets/images';
import { logoutUser } from '@/services/AuthService';

const cx = classNames.bind(styles);

const AvatarBar = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const avatarRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        logoutUser();
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

    return (
        <div className={cx('avatar-bar', { active: show })} ref={avatarRef} onClick={() => setShow((prev) => !prev)}>
            <div className={cx('header')}>
                <img src={images.avatar} alt="avatar" />
                <div className={cx('header-icon')}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-header')}>
                    <img src={user.avatar ?? images.avatar} alt="avatar" />
                    <span className={cx('user-name')}>
                        {user.first_name} {user.last_name}
                    </span>
                </div>

                <Link to="/" className={cx('avatar-item')}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className={cx('item-title')}>Thông tin người dùng</span>
                </Link>

                <Link to="/" className={cx('avatar-item')}>
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

                <button className={cx('avatar-item')} onClick={handleLogout}>
                    <div className={cx('item-icon')}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                    <span className={cx('item-title')}>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default AvatarBar;
