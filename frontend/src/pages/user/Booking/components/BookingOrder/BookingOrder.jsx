import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingOrder.module.scss';
import BookingInfo from './BookingInfo/BookingInfo';
import BookingUser from './BookingUser/BookingUser';
import { createBooking } from '@/services/BookingService';
import { getRoomType } from '@/services/RoomService';
import { getHotel } from '@/services/HotelService';
import { getDate } from '@/utils/dateUtil';
import { Button } from '@/components/Button';

const cx = classNames.bind(styles);

const BookingOrder = ({ countDownTime }) => {
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const { hotelId, roomTypeId } = useParams();
    const [hotel, setHotel] = useState({});
    const [room, setRoom] = useState({});
    const [voucher, setVoucher] = useState({});
    const [checkIn, setCheckIn] = useState(params.get('check_in') ?? getDate(0));
    const [checkOut, setCheckOut] = useState(params.get('check_out') ?? getDate(1));
    const [isRoomAvailable, setIsRoomAvailable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomType = async () => {
            setLoading(true);
            try {
                const [resHotel, resRoom] = await Promise.all([
                    getHotel({ id: hotelId, checkIn, checkOut }),
                    getRoomType({ id: roomTypeId, checkIn, checkOut }),
                ]);
                setHotel(resHotel.hotel);
                setRoom(resRoom.room_type);
                setIsRoomAvailable(resRoom.room_type.available_rooms > 0);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomType();
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await createBooking({ roomTypeId, checkIn, checkOut, voucherId: voucher.id });
            console.log(res);
            if (!res.success) {
                setError(res.message);
            } else {
                setError(null);
                localStorage.setItem('pending_booking_id', res.booking.id);
                localStorage.setItem('booking_created_at', res.booking.created_at);
                localStorage.setItem('booking_total', res.booking.total_amount);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('booking-order')}>
            <div className={cx('booking-left')}>
                {isRoomAvailable ? (
                    <BookingUser hotelId={hotelId} handlePayment={handlePayment} countDownTime={countDownTime} />
                ) : (
                    <div className={cx('out-of-room')}>
                        <div>Phòng đã được đặt hết. Vui lòng chọn phòng khác</div>
                        <Button primaryBorder transparent width="130px" onClick={() => navigate(-1)}>
                            Quay lại
                        </Button>
                    </div>
                )}
            </div>

            <div className={cx('booking-right')}>
                <BookingInfo
                    hotel={hotel}
                    room={room}
                    voucher={voucher}
                    setVoucher={setVoucher}
                    checkIn={checkIn}
                    checkOut={checkOut}
                />
            </div>
        </div>
    );
};

export default BookingOrder;
