import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './RoomsManagement.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { getRoomTypes } from '@/services/RoomService';
import { formatPrice } from '@/utils/stringUtil';
import RoomCreate from './RoomCreate/RoomCreate';
import { deleteRoomType } from '../../../services/RoomService';

const cx = classNames.bind(styles);

const RoomsManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [roomTypes, setRoomTypes] = useState([]);
    const [name, setName] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRoomTypes, setTotalRoomTypes] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRoomTypes = async () => {
        setLoading(true);
        const currentPage = params.get('page') || 1;
        setPage(currentPage);
        const res = await getRoomTypes({ hotelId: admin.hotel_id, name, page: currentPage, limit });
        if (!res.success) {
            setError(res.message);
        } else {
            setRoomTypes(res.room_types);
            setTotalPages(res.totalPages);
            setTotalRoomTypes(res.totalItems);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchRoomTypes();
    }, [admin, name, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const handleDeleteRoomType = async (room = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa loại phòng ${room.name} không`);
        if (confirmed) {
            const res = await deleteRoomType(room.id);
            alert(res.message);
            if (res.success) {
                fetchRoomTypes();
            }
        }
    };

    return (
        <div className={cx('rooms-management-page')}>
            <div className={cx('header')}>
                <div className={cx('search-bar')}>
                    <SearchOneValue id="search" label="Tên loại phòng" value={name} setValue={setName} />
                </div>

                <div className={cx('total')}>Có tất cả {totalRoomTypes} loại phòng</div>

                <RoomCreate fetchRoomTypes={fetchRoomTypes} />
            </div>

            {roomTypes.length > 0 ? (
                <table className={cx('rooms-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên loại phòng</th>
                            <th>Số người</th>
                            <th>Diện tích</th>
                            <th>Tổng phòng</th>
                            <th>Số phòng HĐ</th>
                            <th>Số phòng BT</th>
                            <th>Giá phòng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypes.map((rt, index) => (
                            <tr key={`room-type-${rt.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>{rt.name}</td>
                                <td>{rt.capacity}</td>
                                <td>{rt.area} m²</td>
                                <td>{rt.total_rooms} phòng</td>
                                <td>{rt.active_rooms} phòng</td>
                                <td>{rt.maintenance_rooms} phòng</td>
                                <td>{formatPrice(rt.price)}</td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <Button className={cx('view-btn')} small to={`/rooms/${rt.id}`}>
                                            <VisibilityIcon />
                                        </Button>
                                        <Button
                                            className={cx('delete-btn')}
                                            small
                                            onClick={() => handleDeleteRoomType(rt)}
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

export default RoomsManagement;
