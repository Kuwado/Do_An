import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import styles from './Sidebar.module.scss';
import config from '@/config';

const cx = classNames.bind(styles);

const StaffFunction = () => {
    return (
        <>
            {/* <NavLink
                to={config.routes.staff.dashboard}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <DashboardIcon />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </NavLink> */}

            <NavLink
                to={config.routes.staff.bookings}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <ReceiptLongIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn đặt phòng</div>
            </NavLink>

            <NavLink
                to={config.routes.staff.serviceBookings}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <ReceiptIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn dịch vụ</div>
            </NavLink>

            <NavLink
                to={config.routes.staff.rooms}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <MeetingRoomIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý phòng</div>
            </NavLink>

            <NavLink
                to={config.routes.staff.services}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <RoomServiceIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý dịch vụ</div>
            </NavLink>

            <NavLink
                to={config.routes.staff.vouchers}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <LocalActivityIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý voucher</div>
            </NavLink>
        </>
    );
};

export default StaffFunction;
