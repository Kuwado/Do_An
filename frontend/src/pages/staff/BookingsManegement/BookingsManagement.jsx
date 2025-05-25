import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './BookingsManagement.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { formatDate } from '@/utils/stringUtil';
import { cancelBooking, confirmBooking, getBookingsByHotelId } from '@/services/BookingService';

const cx = classNames.bind(styles);

const FILTER_STATUS = {
    '': 'Tất cả',
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Đã hoàn thành',
};

const SORT_DATE = {
    '': 'Tất cả',
    asc: 'Gần nhất',
    desc: 'Xa nhất',
};

const BookingsManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [bookings, setBookings] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const [sortDate, setSortDate] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        const res = await getBookingsByHotelId({
            hotelId: admin.hotel_id,
            name,
            status,
            sortDate,
            page,
            limit,
        });
        if (!res.success) {
            setError(res.message);
        } else {
            setBookings(res.bookings);
            setTotalPages(res.totalPages);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchBookings();
    }, [admin, name, status, sortDate, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const handleConfirmBooking = async (booking = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xác nhận đơn này không`);
        if (confirmed) {
            const res = await confirmBooking(booking.id);
            if (res.success) {
                fetchBookings();
            } else {
                alert(res.message);
            }
        }
    };

    const handleCancelBooking = async (booking = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn hủy đơn này không`);
        if (confirmed) {
            const res = await cancelBooking(booking.id);
            if (res.success) {
                fetchBookings();
            } else {
                alert(res.message);
            }
        }
    };

    return (
        <div className={cx('bookings-management-page')}>
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

                    <Dropdown label="Ngày nhận" selected={SORT_DATE[sortDate]} width="150px" outline>
                        <div onClick={() => setSortDate('asc')}>{SORT_DATE['asc']}</div>
                        <div onClick={() => setSortDate('desc')}>{SORT_DATE['desc']}</div>
                        <div onClick={() => setSortDate('')}>{SORT_DATE['']}</div>
                    </Dropdown>
                </div>
            </div>

            {bookings.length > 0 ? (
                <table className={cx('bookings-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên khách hàng</th>
                            <th>Loại phòng</th>
                            <th>Số phòng</th>
                            <th>Trạng thái</th>
                            <th>Ngày nhận</th>
                            <th>Ngày trả</th>
                            <th>Xem</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={`booking-${booking.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>
                                    {booking.user.first_name} {booking.user.last_name}
                                </td>
                                <td>{booking.room.room_type.name}</td>
                                <td>{booking.room.room_number}</td>
                                <td>
                                    <div className={cx('status', booking.status)}>{FILTER_STATUS[booking.status]}</div>
                                </td>
                                <td>{formatDate(booking.check_in)}</td>
                                <td>{formatDate(booking.check_out)}</td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <Button className={cx('view-btn')} small to={`/staff/bookings/${booking.id}`}>
                                            <VisibilityIcon />
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        {booking.status === 'pending' && (
                                            <Button
                                                className={cx('confirm-btn')}
                                                small
                                                onClick={() => handleConfirmBooking(booking)}
                                            >
                                                <TaskAltIcon />
                                            </Button>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <Button
                                                className={cx('cancel-btn')}
                                                small
                                                onClick={() => handleCancelBooking(booking)}
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
                <div>Không tìm thấy đơn đặt</div>
            )}

            {totalPages > 1 && (
                <div className={cx('pagination-container')}>
                    <Pagination total={totalPages} />
                </div>
            )}
        </div>
    );
};

export default BookingsManagement;
