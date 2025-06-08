import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './UserHeader.module.scss';
import config from '@/config';
import AvatarBar from './AvatarBar';
import { Button } from '@/components/Button';

const cx = classNames.bind(styles);

const UserHeader = ({ className = '' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user_token'));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('user-header', { scrolled: isScrolled, [className]: className })}>
            <div className={cx('header-content')}>
                <div className={cx('header-left')}>
                    <Link className={cx('logo')} to={config.routes.user.home}>
                        KuwaHotel
                    </Link>
                    <div className={cx('header-item-list')}>
                        <Link
                            className={cx('header-item', { active: location.pathname === config.routes.user.home })}
                            to={config.routes.user.home}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            className={cx('header-item', { active: location.pathname === config.routes.user.hotels })}
                            to={config.routes.user.hotels}
                        >
                            Khách sạn
                        </Link>
                        <Link
                            className={cx('header-item', { active: location.pathname === config.routes.user.about })}
                            to={config.routes.user.about}
                        >
                            Về chúng tôi
                        </Link>
                    </div>
                </div>

                <div className={cx('header-right')}>
                    {isAuthenticated ? (
                        <AvatarBar />
                    ) : (
                        <>
                            <Button to={config.routes.user.login} secondary>
                                Đăng nhập
                            </Button>
                            <Button to={config.routes.user.register} secondaryOutline>
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
