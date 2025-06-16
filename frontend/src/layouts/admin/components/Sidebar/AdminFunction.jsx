import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

import styles from './Sidebar.module.scss';
import config from '@/config';
import useProfile from '@/hooks/profile/useProfile';
import { getHotel } from '@/services/HotelService';

const cx = classNames.bind(styles);

const AdminFunction = () => {
    const { admin } = useProfile();
    const [canPredict, setCanPredict] = useState(false);

    useEffect(() => {
        const fetchPredict = async () => {
            const res = await getHotel({ id: admin.hotel_id });
            if (res.success) {
                setCanPredict(res.hotel.predict);
            }
        };

        fetchPredict();
    }, [admin]);

    return (
        <>
            {/* <NavLink
                to={config.routes.admin.dashboard}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <DashboardIcon />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </NavLink> */}

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

            <NavLink
                to={config.routes.admin.services}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <RoomServiceIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý dịch vụ</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.vouchers}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <LocalActivityIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý voucher</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.bookings}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <ReceiptLongIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn đặt</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.serviceBookings}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <ReceiptIcon />
                </div>
                <div className={cx('sidebar-title')}>Quản lý đơn dịch vụ</div>
            </NavLink>

            <NavLink
                to={config.routes.admin.revenue}
                className={({ isActive }) => cx('sidebar-item', { active: isActive })}
            >
                <div className={cx('sidebar-icon')}>
                    <BarChartIcon />
                </div>
                <div className={cx('sidebar-title')}>Doanh thu</div>
            </NavLink>

            {canPredict && (
                <NavLink
                    to={config.routes.admin.predict}
                    className={({ isActive }) => cx('sidebar-item', { active: isActive })}
                >
                    <div className={cx('sidebar-icon')}>
                        <OnlinePredictionIcon />
                    </div>
                    <div className={cx('sidebar-title')}>Dự đoán</div>
                </NavLink>
            )}
        </>
    );
};

export default AdminFunction;
