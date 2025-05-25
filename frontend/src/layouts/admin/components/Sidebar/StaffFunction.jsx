import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import styles from './Sidebar.module.scss';
import config from '@/config';

const cx = classNames.bind(styles);

const StaffFunction = () => {
    return (
        <>
            <NavLink
                to={config.routes.staff.dashboard}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <DashboardIcon />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </NavLink>
            <NavLink
                to={config.routes.staff.bookings}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <ReceiptLongIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn đặt phòng</div>
            </NavLink>
        </>
    );
};

export default StaffFunction;
