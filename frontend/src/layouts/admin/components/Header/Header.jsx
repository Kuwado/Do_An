import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import Image from '@/components/Image';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
    const { admin, fetchAdmin } = useProfile();
    const [role, setRole] = useState('admin');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (admin.avatar) setAvatarUrl(`${IMAGE_URL}${admin.avatar}`);
    }, [admin.avatar]);

    return (
        <div className={cx('admin-header')}>
            <div className={cx('info-container')}>
                <Image src={avatarUrl} alt="avatar" />
                <div className={cx('info')}>
                    <div className={cx('full-name')}>
                        {admin.first_name} {admin.last_name}
                    </div>
                    <div className={cx('role')}>
                        Vai trò: <span>{admin.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
