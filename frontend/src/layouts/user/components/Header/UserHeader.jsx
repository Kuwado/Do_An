import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './UserHeader.module.scss';
import config from '@/config';
import AvatarBar from './AvatarBar';
import { Button } from '@/components/Button';

const cx = classNames.bind(styles);

const UserHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

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
        <div className={cx('user-header', { scrolled: isScrolled })}>
            <div className={cx('header-content')}>
                <div className={cx('header-left')}>
                    <div className={cx('logo')}>KuwaHotel</div>
                    <div className={cx('header-item-list')}>
                        <Link
                            className={cx('header-item', { active: location.pathname === config.routes.user.hotels })}
                            to={config.routes.user.hotels}
                        >
                            Khách sạn
                        </Link>
                        <Link
                            className={cx('header-item', { active: location.pathname === config.routes.user.vouchers })}
                            to={config.routes.user.vouchers}
                        >
                            Mã giảm giá
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
