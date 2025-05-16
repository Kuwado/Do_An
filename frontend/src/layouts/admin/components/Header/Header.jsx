import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import images from '@/assets/images';

const cx = classNames.bind(styles);

const Header = () => {
    const { admin, fetchAdmin } = useProfile();
    const [role, setRole] = useState('admin');

    return (
        <div className={cx('admin-header')}>
            <div className={cx('info-container')}>
                <img src={admin && admin.avatar ? admin.avatar : images.avatar} alt="avatar" />
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
