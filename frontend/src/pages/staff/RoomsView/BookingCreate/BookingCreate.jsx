import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BookingCreate.module.scss';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import useProfile from '@/hooks/profile/useProfile';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, QuantityInput } from '@/components/Input';
import TextArea from '@/components/TextArea/TextArea';
import UploadImages from '@/constants/UploadImages';
import { createRoomType } from '@/services/RoomService';
import Loading from '@/constants/Loading';
import { createUser, getUserByPhone } from '../../../../services/UserService';
import { createBookingByAdmin } from '../../../../services/BookingService';
import { getDaysBetween } from '../../../../utils/dateUtil';
import { formatDate } from '../../../../utils/stringUtil';

const cx = classNames.bind(styles);

const BookingCreate = ({ room, roomType, fetchRooms, checkIn, checkOut }) => {
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null);
    const [booking, setBooking] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(room);

    const handleSearchUser = async () => {
        setLoading(true);
        const res = await getUserByPhone(phone);
        if (res.success) {
            setUser(res.user);
            setError(null);
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    const handleCreateUser = async () => {
        setLoading(true);
        const res = await createUser({
            username: phone,
            password: '123456',
            firstName: 'Khách',
            lastName: 'Hàng',
            phone,
        });
        if (res.success) {
            setUser(res.user);
            setError(null);
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        setError(null);
        if (!phone) {
            setUser(null);
        }
    }, [phone]);

    const handleCreateBooking = async () => {
        if (!user) {
            alert('Vui lòng chọn khách hàng');
        } else {
            const res = await createBookingByAdmin({ roomId: room.id, userId: user.id, checkIn, checkOut });
            alert(res.message);
            if (res.success) {
                fetchRooms();
                setShow(false);
            }
        }
    };

    return (
        <>
            <Button className={cx('create-btn')} small onClick={() => setShow(true)}>
                <ReceiptLongIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('booking-create')}>
                    <div className={cx('title')}>Tạo đơn đặt phòng</div>

                    <div className={cx('content')}>
                        <div className={cx('content-container')}>
                            <div className={cx('search-container')}>
                                <Input
                                    label="Số điện thoại hoặc tài khoản"
                                    id="phone"
                                    value={phone}
                                    setValue={setPhone}
                                    required
                                />
                                <Button
                                    className={cx('search-btn')}
                                    secondary
                                    curved
                                    onClick={handleSearchUser}
                                    noClick={!phone}
                                >
                                    Tìm kiếm
                                </Button>
                            </div>

                            {error && (
                                <div className={cx('error')}>
                                    {error}
                                    <span className={cx('create-text')} onClick={handleCreateUser}>
                                        Tạo tài khoản
                                    </span>
                                </div>
                            )}

                            <div className={cx('user-profile')}>
                                {!loading && user && (
                                    <>
                                        <div className={cx('item')}>
                                            <div className={cx('item-title')}>Họ</div>
                                            <div className={cx('item-content')}>{user.first_name}</div>
                                        </div>

                                        <div className={cx('item')}>
                                            <div className={cx('item-title')}>Tên</div>
                                            <div className={cx('item-content')}>{user.last_name}</div>
                                        </div>

                                        <div className={cx('item')}>
                                            <div className={cx('item-title')}>Tên tài khoản</div>
                                            <div className={cx('item-content')}>{user.username}</div>
                                        </div>

                                        <div className={cx('item')}>
                                            <div className={cx('item-title')}>Số điện thoại</div>
                                            <div className={cx('item-content')}>{user.phone || 'Không có'}</div>
                                        </div>
                                    </>
                                )}

                                {!loading && !user && <div>Vui lòng tra cứu khách hàng</div>}

                                {loading && <Loading />}
                            </div>
                        </div>

                        <div className={cx('content-container')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Loại phòng</div>
                                <div className={cx('item-content')}>{roomType.name}</div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Số phòng phòng</div>
                                <div className={cx('item-content')}>{room.room_number}</div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Ngày nhận</div>
                                <div className={cx('item-content')}>{formatDate(checkIn)}</div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Ngày trả</div>
                                <div className={cx('item-content')}>{formatDate(checkOut)}</div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Tổng số ngày</div>
                                <div className={cx('item-content')}>
                                    {formatDate(getDaysBetween(checkIn, checkOut))}
                                </div>
                            </div>

                            <div className={cx('action-btn')}>
                                <Button onClick={handleCreateBooking} secondary>
                                    Tạo đơn
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default BookingCreate;
