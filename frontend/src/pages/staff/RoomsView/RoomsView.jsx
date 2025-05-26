import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './RoomsView.module.scss';
import Dropdown from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { DateInput } from '@/components/Input';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import Loading from '@/constants/Loading';
import { getRoomTypes } from '@/services/RoomService';
import { formatPrice } from '@/utils/stringUtil';
import { getDate, getNextDate, getPreviousDate } from '@/utils/dateUtil';
import { getRooms, getRoomType } from '../../../services/RoomService';
import { IconButton } from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import BookingCreate from './BookingCreate/BookingCreate';

const cx = classNames.bind(styles);

const FILTER_LABELS = {
    '': 'Tất cả',
    active: 'Hoạt động',
    maintenance: 'Bảo trì',
    available: 'Phòng trống',
    booked: 'Đã được đặt',
};

const RoomsView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomType, setRoomType] = useState('');
    const [rooms, setRooms] = useState([]);
    const [number, setNumber] = useState(searchParams.get('number') || '');
    const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || getDate(0));
    const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || getDate(1));
    const [filter, setFilter] = useState(searchParams.get('filter') || 'available');
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 7;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRoomType = async () => {
        const res = await getRoomType({ id });
        if (res.success) {
            setRoomType(res.room_type);
        }
    };

    useEffect(() => {
        fetchRoomType();
    }, [id]);

    useEffect(() => {
        const params = {};
        if (number) params.number = number;
        if (checkIn) params.checkIn = checkIn;
        if (checkOut) params.checkOut = checkOut;
        if (filter) params.filter = filter;
        if (page) params.page = page;

        setSearchParams(params);
    }, [number, checkIn, checkOut, filter]);

    const fetchRooms = async () => {
        setLoading(true);
        const res = await getRooms({ roomTypeId: id, number, checkIn, checkOut, filter, page, limit });
        console.log(res);
        if (!res.success) {
            setError(res.message);
        } else {
            setRooms(res.rooms);
            setTotalPages(res.totalPages);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) fetchRooms();
    }, [id, number, checkIn, checkOut, filter, page]);

    useEffect(() => {
        if (rooms.length <= limit) {
            setPage(1);
        }
    }, [rooms]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const handleBack = () => {
        const prev = sessionStorage.getItem('previousUrl');
        console.log(prev);
        if (prev) {
            navigate(prev);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={cx('rooms-view-page')}>
            <div className={cx('room-type-title-container')}>
                <div className={cx('room-type-title')}>{roomType.name}</div>
                <IconButton className={cx('back-btn')} onClick={handleBack}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </IconButton>
            </div>

            <div className={cx('rooms-content')}>
                <div className={cx('header')}>
                    <div className={cx('left-header')}>
                        <div className={cx('search-bar')}>
                            <SearchOneValue id="search" label="Số phòng" value={number} setValue={setNumber} />
                        </div>

                        <div className={cx('date-container')}>
                            <DateInput
                                value={checkIn}
                                setValue={setCheckIn}
                                label="Ngày check-in"
                                min={undefined}
                                max={getPreviousDate(checkOut)}
                                width="180px"
                            />
                            <DateInput
                                value={checkOut}
                                setValue={setCheckOut}
                                label="Ngày check-out"
                                min={getNextDate(checkIn)}
                                width="180px"
                            />
                        </div>

                        <Dropdown label="Trạng thái" selected={FILTER_LABELS[filter]} width="150px" outline>
                            <div onClick={() => setFilter('available')}>{FILTER_LABELS['available']}</div>
                            <div onClick={() => setFilter('booked')}>{FILTER_LABELS['booked']}</div>
                            <div onClick={() => setFilter('active')}>{FILTER_LABELS['active']}</div>
                        </Dropdown>
                    </div>
                </div>

                {!loading && rooms.length > 0 ? (
                    <>
                        <table className={cx('rooms-table')}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Số phòng</th>
                                    <th>Trạng thái sử dụng</th>
                                    <th>Trạng thái đặt</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room, index) => (
                                    <tr key={`room-type-${room.id}`}>
                                        <td>{index + 1 + (page - 1) * limit}</td>
                                        <td>{room.room_number}</td>
                                        <td>
                                            <div className={cx('status', room.status)}>
                                                {room.status === 'active'
                                                    ? FILTER_LABELS['active']
                                                    : FILTER_LABELS['maintenance']}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={cx(
                                                    'status',
                                                    room.status === 'maintenance'
                                                        ? 'maintenance'
                                                        : room.isBooked
                                                        ? 'booked'
                                                        : 'available',
                                                )}
                                            >
                                                {room.status === 'maintenance'
                                                    ? FILTER_LABELS['maintenance']
                                                    : room.isBooked
                                                    ? FILTER_LABELS['booked']
                                                    : FILTER_LABELS['available']}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={cx('action-btns')}>
                                                {!room.isBooked && (
                                                    <BookingCreate
                                                        room={room}
                                                        roomType={roomType}
                                                        fetchRooms={fetchRooms}
                                                        checkIn={checkIn}
                                                        checkOut={checkOut}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {totalPages > 1 && (
                            <div className={cx('pagination-container')}>
                                <Pagination total={totalPages} setPage={setPage} />
                            </div>
                        )}
                    </>
                ) : (
                    !loading && <div>Không tìm thấy loại phòng</div>
                )}

                {loading && <Loading />}
            </div>
        </div>
    );
};

export default RoomsView;
