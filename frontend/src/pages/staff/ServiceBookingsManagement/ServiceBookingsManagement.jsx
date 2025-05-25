import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ServiceBookingsManagement.module.scss';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { formatDate } from '@/utils/stringUtil';
import {
    cancelServiceBooking,
    confirmServiceBooking,
    getServiceBookingsByHotelId,
} from '@/services/ServiceHotelService';
import ServiceBookingView from './ServiceBookingView/ServiceBookingView';

const cx = classNames.bind(styles);

const FILTER_STATUS = {
    '': 'Tất cả',
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Đã hoàn thành',
};

const FILTER_CATEGORY = {
    '': 'Tất cả',
    dining: 'Ăn uống',
    entertainment: 'Giải trí',
    facilities: 'Tiện ích',
};

const SORT_DATE = {
    '': 'Tất cả',
    asc: 'Gần nhất',
    desc: 'Xa nhất',
};

const ServiceBookingsManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [serviceBookings, setServiceBookings] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const [category, setCategory] = useState('');
    const [sortDate, setSortDate] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchserviceBookings = async () => {
        setLoading(true);
        const res = await getServiceBookingsByHotelId({
            hotelId: admin.hotel_id,
            name,
            status,
            category,
            sortDate,
            page,
            limit,
        });
        if (!res.success) {
            setError(res.message);
        } else {
            setServiceBookings(res.service_bookings);
            setTotalPages(res.totalPages);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchserviceBookings();
    }, [admin, name, status, category, sortDate, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const handleConfirmServiceBooking = async (serviceBooking = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xác nhận đơn dịch vụ này không`);
        if (confirmed) {
            const res = await confirmServiceBooking(serviceBooking.id);
            if (res.success) {
                fetchserviceBookings();
            } else {
                alert(res.message);
            }
        }
    };

    const handleCancelServiceBooking = async (serviceBooking = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn hủy đơn dịch vụ này không`);
        if (confirmed) {
            const res = await cancelServiceBooking(serviceBooking.id);
            if (res.success) {
                fetchserviceBookings();
            } else {
                alert(res.message);
            }
        }
    };

    return (
        <div className={cx('service-bookings-management-page')}>
            <div className={cx('header')}>
                <div className={cx('left-header')}>
                    <div className={cx('search-bar')}>
                        <SearchOneValue id="search" label="Tên khách hàng" value={name} setValue={setName} />
                    </div>

                    <Dropdown label="Trạng thái" selected={FILTER_STATUS[status]} width="170px" outline>
                        <div onClick={() => setStatus('pending')}>{FILTER_STATUS['pending']}</div>
                        <div onClick={() => setStatus('confirmed')}>{FILTER_STATUS['confirmed']}</div>
                        <div onClick={() => setStatus('cancelled')}>{FILTER_STATUS['cancelled']}</div>
                        <div onClick={() => setStatus('completed')}>{FILTER_STATUS['completed']}</div>
                        <div onClick={() => setStatus('')}>{FILTER_STATUS['']}</div>
                    </Dropdown>

                    <Dropdown label="Loại dịch vụ" selected={FILTER_CATEGORY[category]} width="150px" outline>
                        <div onClick={() => setCategory('dining')}>{FILTER_CATEGORY['dining']}</div>
                        <div onClick={() => setCategory('entertainment')}>{FILTER_CATEGORY['entertainment']}</div>
                        <div onClick={() => setCategory('facilities')}>{FILTER_CATEGORY['facilities']}</div>
                        <div onClick={() => setCategory('')}>{FILTER_CATEGORY['']}</div>
                    </Dropdown>

                    <Dropdown label="Ngày dùng" selected={SORT_DATE[sortDate]} width="150px" outline>
                        <div onClick={() => setSortDate('asc')}>{SORT_DATE['asc']}</div>
                        <div onClick={() => setSortDate('desc')}>{SORT_DATE['desc']}</div>
                        <div onClick={() => setSortDate('')}>{SORT_DATE['']}</div>
                    </Dropdown>
                </div>
            </div>

            {serviceBookings.length > 0 ? (
                <table className={cx('service-bookings-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên khách hàng</th>
                            <th>Tên dịch vụ</th>
                            <th>Loại dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Ngày dùng</th>
                            <th>Trạng thái</th>
                            <th>Xem</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceBookings.map((serviceBooking, index) => (
                            <tr key={`service-booking-${serviceBooking.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>
                                    {serviceBooking.booking.user.first_name} {serviceBooking.booking.user.last_name}
                                </td>
                                <td>{serviceBooking.service.name}</td>
                                <td>
                                    <div className={cx('category', serviceBooking.service.category)}>
                                        {FILTER_CATEGORY[serviceBooking.service.category]}
                                    </div>
                                </td>
                                <td>{serviceBooking.quantity} suất</td>
                                <td>{formatDate(serviceBooking.date)}</td>
                                <td>
                                    <div className={cx('status', serviceBooking.status)}>
                                        {FILTER_STATUS[serviceBooking.status]}
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <ServiceBookingView
                                            serviceBooking={serviceBooking}
                                            fetchserviceBookings={fetchserviceBookings}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        {serviceBooking.status === 'pending' && (
                                            <Button
                                                className={cx('confirm-btn')}
                                                small
                                                onClick={() => handleConfirmServiceBooking(serviceBooking)}
                                            >
                                                <TaskAltIcon />
                                            </Button>
                                        )}
                                        {serviceBooking.status === 'confirmed' && (
                                            <Button
                                                className={cx('cancel-btn')}
                                                small
                                                onClick={() => handleCancelServiceBooking(serviceBooking)}
                                            >
                                                <HighlightOffIcon />
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Không tìm thấy đơn dịch vụ</div>
            )}

            {totalPages > 1 && (
                <div className={cx('pagination-container')}>
                    <Pagination total={totalPages} />
                </div>
            )}
        </div>
    );
};

export default ServiceBookingsManagement;
