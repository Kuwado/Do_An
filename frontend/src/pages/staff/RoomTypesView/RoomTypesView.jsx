import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './RoomTypesView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BedIcon from '@mui/icons-material/Bed';
import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import { DateInput } from '@/components/Input';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import Loading from '@/constants/Loading';
import { getRoomTypes } from '@/services/RoomService';
import { formatPrice } from '@/utils/stringUtil';
import { getDate, getNextDate, getPreviousDate } from '@/utils/dateUtil';
import RoomTypeView from './RoomTypeView/RoomTypeView';

const cx = classNames.bind(styles);

const RoomTypesView = () => {
    const { admin } = useProfile();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [roomTypes, setRoomTypes] = useState([]);
    const [name, setName] = useState(searchParams.get('name') || '');
    const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || getDate(0));
    const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || getDate(1));
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRoomTypes, setTotalRoomTypes] = useState(0);
    const limit = 8;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = {};
        if (name) params.name = name;
        if (checkIn) params.checkIn = checkIn;
        if (checkOut) params.checkOut = checkOut;
        if (page) params.page = page;

        setSearchParams(params);
    }, [name, checkIn, checkOut, page]);

    const fetchRoomTypes = async () => {
        setLoading(true);
        const res = await getRoomTypes({ hotelId: admin.hotel_id, name, checkIn, checkOut, page, limit });
        console.log(res);
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
    }, [admin.hotel_id, name, checkIn, checkOut, page]);

    useEffect(() => {
        if (roomTypes.length <= limit) {
            setPage(1);
        }
    }, [roomTypes]);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const handleViewRooms = (id) => {
        sessionStorage.setItem('previousUrl', location.pathname + location.search);
        navigate(`/staff/rooms-management/${id}/list`);
    };

    return (
        <div className={cx('rooms-management-page')}>
            <div className={cx('header')}>
                <div className={cx('left-header')}>
                    <div className={cx('search-bar')}>
                        <SearchOneValue id="search" label="Tên loại phòng" value={name} setValue={setName} />
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
                </div>
            </div>

            {!loading && roomTypes.length > 0 ? (
                <>
                    <table className={cx('rooms-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên loại phòng</th>
                                <th>Số người</th>
                                <th>Diện tích</th>
                                <th>Số phòng hoạt động</th>
                                <th>Số phòng trống</th>
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
                                    <td>
                                        {rt.active_rooms}/{rt.total_rooms} phòng
                                    </td>
                                    <td>{rt.available_rooms} phòng</td>
                                    <td>{formatPrice(rt.price)}</td>
                                    <td>
                                        <div className={cx('action-btns')}>
                                            <RoomTypeView roomType={rt} />
                                            <Button
                                                className={cx('show-btn')}
                                                small
                                                secondary
                                                onClick={() => handleViewRooms(rt.id)}
                                            >
                                                <BedIcon />
                                            </Button>
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
    );
};

export default RoomTypesView;
