import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BarChartIcon from '@mui/icons-material/BarChart';

import styles from './Sidebar.module.scss';
import config from '@/config';

const cx = classNames.bind(styles);

const AdminFunction = () => {
    return (
        <>
            <NavLink
                to={config.routes.admin.dashboard}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <DashboardIcon />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.hotel}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <HotelIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý khách sạn</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.staffs}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <GroupIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý nhân viên</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.rooms}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <MeetingRoomIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý phòng</div>
            </NavLink>

            <NavLink className={cx('sidebar-item')} to={config.routes.staff.dashboard}>
                <div className={cx('sidebar-icon')}>
                    <RoomServiceIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý dịch vụ</div>
            </NavLink>

            <NavLink className={cx('sidebar-item')} to={config.routes.staff.dashboard}>
                <div className={cx('sidebar-icon')}>
                    <LocalActivityIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý voucher</div>
            </NavLink>

            <NavLink className={cx('sidebar-item')} to={config.routes.staff.dashboard}>
                <div className={cx('sidebar-icon')}>
                    <ReceiptLongIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn đặt</div>
            </NavLink>

            <NavLink className={cx('sidebar-item')} to={config.routes.staff.dashboard}>
                <div className={cx('sidebar-icon')}>
                    <BarChartIcon />
                </div>
                <div className={cx('sidebar-title')}>Doanh thu</div>
            </NavLink>
        </>
    );
};

export default AdminFunction;
