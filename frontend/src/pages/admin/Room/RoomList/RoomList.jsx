import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './RoomList.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@/components/Button';
import { DateInput } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { deleteRoom, getRooms } from '@/services/RoomService';
import { getDate, getNextDate, getPreviousDate } from '@/utils/dateUtil';
import RoomCreate from '../RoomCreate/RoomCreate';
import RoomEdit from '../RoomEdit/RoomEdit';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const FILTER_LABELS = {
    '': 'Tất cả',
    active: 'Hoạt động',
    maintenance: 'Bảo trì',
    available: 'Phòng trống',
    booked: 'Đã được đặt',
};

const RoomList = () => {
    const { id } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [rooms, setRooms] = useState([]);
    const [number, setNumber] = useState('');
    const [checkIn, setCheckIn] = useState(getDate(0));
    const [checkOut, setCheckOut] = useState(getDate(1));
    const [filter, setFilter] = useState('');
    const [totalRooms, setTotalRooms] = useState(0);
    const limit = 5;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchRooms = async () => {
        const res = await getRooms({ roomTypeId: id, number, checkIn, checkOut, filter, page, limit });
        console.log(res);
        if (res.success) {
            setRooms(res.rooms);
            setTotalRooms(res.totalItems);
            setTotalPages(res.totalPages);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [id, number, checkIn, checkOut, filter, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    const handleDeleteRoom = async (room = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa phòng ${room.room_number} không`);
        if (confirmed) {
            const res = await deleteRoom(room.id);
            if (res.success) {
                toast.success(res.message);
                fetchRooms();
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('room-list')}>
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
                            min={getDate(0)}
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
                        <div onClick={() => setFilter('active')}>{FILTER_LABELS['active']}</div>
                        <div onClick={() => setFilter('maintenance')}>{FILTER_LABELS['maintenance']}</div>
                        <div onClick={() => setFilter('available')}>{FILTER_LABELS['available']}</div>
                        <div onClick={() => setFilter('booked')}>{FILTER_LABELS['booked']}</div>
                        <div onClick={() => setFilter('')}>{FILTER_LABELS['']}</div>
                    </Dropdown>
                </div>

                <RoomCreate fetchRooms={fetchRooms} roomTypeId={id} />
            </div>

            {rooms.length > 0 ? (
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
                                        <RoomEdit fetchRooms={fetchRooms} room={room} />
                                        <Button
                                            className={cx('delete-btn')}
                                            small
                                            onClick={() => handleDeleteRoom(room)}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Không tìm thấy loại phòng</div>
            )}

            {totalPages > 1 && (
                <div className={cx('pagination-container')}>
                    <Pagination total={totalPages} />
                </div>
            )}
        </div>
    );
};

export default RoomList;
