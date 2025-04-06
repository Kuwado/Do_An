import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import { IconButton } from '@/components/Button';
import config from '@/config';
import images from '@/assets/images';
import AdminFunction from './AdminFunction';
import StaffFunction from './StaffFunction';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [show, setShow] = useState(true);
    const admin = JSON.parse(localStorage.getItem('admin'));
    const [role, setRole] = useState('admin');

    return (
        <div className={cx('sidebar', { hide: !show })}>
            <IconButton className={cx('show-btn')} secondaryBorder onClick={() => setShow((prev) => !prev)}>
                <FontAwesomeIcon icon={show ? faChevronLeft : faChevronRight} />
            </IconButton>

            <div className={cx('sidebar-header')}>
                <div className={cx('logo')}>KH</div>
                <div className={cx('logo-name')}>KuwaHotels</div>
            </div>

            <div className={cx('sidebar-body')}>
                {role == 'admin' && <AdminFunction />}
                {role == 'staff' && <StaffFunction />}
            </div>

            <div className={cx('sidebar-footer')}>
                <Link className={cx('sidebar-item')} to={config.routes.admin.login}>
                    <div className={cx('sidebar-icon')}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                    <div className={cx('sidebar-title')}>Đăng xuất</div>
                </Link>

                <div className={cx('info-container')}>
                    <img src={admin && admin.avatar ? admin.avatar : images.avatar} alt="avatar" />
                    <div className={cx('info')}>
                        {/* <div className={cx('full-name')}>
                            {admin.first_name} {admin.last_name}
                        </div>
                        <div className={cx('role')}>
                            Vai trò: <span>{admin.role == 'admin' ? 'Quản trị viên' : 'Nhân viên'}</span>
                        </div> */}
                        <div className={cx('full-name')}>Việt Hoàn</div>
                        <div className={cx('role')}>
                            Vai trò: <span>Nhân viên</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
