import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './BookingOrder.module.scss';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import images from '@/assets/images';
import Rating from '@/constants/Rating';
import { getRoomType } from '@/services/RoomService';
import { getHotel } from '@/services/HotelService';
import { getDate } from '@/utils/dateUtil';
import {
    faClock,
    faMoneyBill,
    faRulerCombined,
    faSignature,
    faTicket,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate, getDaysBetween } from '@/utils/dateUtil';
import { formatPrice } from '@/utils/stringUtil';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BookingInfo from './BookingInfo/BookingInfo';
import BookingUser from './BookingUser/BookingUser';

const cx = classNames.bind(styles);

const IMAGES = [images.room, images.room, images.room, images.room];

const BookingOrder = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const { hotelId, roomTypeId } = useParams();
    const [hotel, setHotel] = useState({});
    const [room, setRoom] = useState({});
    const [voucher, setVoucher] = useState({});
    const [checkIn, setCheckIn] = useState(params.get('check_in') ?? getDate(0));
    const [checkOut, setCheckOut] = useState(params.get('check_out') ?? getDate(1));
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
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomType();
    }, []);

    return (
        <div className={cx('booking-order')}>
            <div className={cx('booking-left')}>
                <BookingUser hotelId={hotelId} />
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
