import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Hotel.module.scss';
import Header from './components/Header/Header';
import Overview from './components/Overview/Overview';
import Rooms from './components/Rooms/Rooms';
import Vouchers from './components/Vouchers/Vouchers';
import Reviews from './components/Reviews/Reviews';
import { getHotel } from '@/services/HotelService';
import { getRoomTypes } from '../../../services/RoomService';
import { getVouchers } from '../../../services/VoucherService';
import { getReviews } from '../../../services/ReviewService';

const cx = classNames.bind(styles);

const Hotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const overviewRef = useRef(null);
    const roomsRef = useRef(null);
    const vouchersRef = useRef(null);
    const reviewsRef = useRef(null);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    console.log(vouchers);
    console.log(id);

    useEffect(() => {
        const fetchHotelData = async () => {
            setLoading(true);
            try {
                const [resHotel, resRooms, resVouchers, resReviews] = await Promise.all([
                    getHotel(id),
                    getRoomTypes({ hotelId: id }),
                    getVouchers({ hotelId: id }),
                    getReviews({ hotelId: id }),
                ]);

                setHotel(resHotel.hotel);
                setRooms(resRooms.room_types);
                setVouchers(resVouchers.vouchers);
                setReviews(resReviews.reviews);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHotelData();
        }
    }, [id]);

    return (
        <div className={cx('hotel-page')}>
            <Header overviewRef={overviewRef} roomsRef={roomsRef} vouchersRef={vouchersRef} reviewsRef={reviewsRef} />

            <div className={cx('hotel-content')}>
                <Overview forwardedRef={overviewRef} hotel={hotel} />
                <Rooms forwardedRef={roomsRef} rooms={rooms} />
                <Vouchers forwardedRef={vouchersRef} vouchers={vouchers} />
                <Reviews forwardedRef={reviewsRef} reviews={reviews} />
            </div>
        </div>
    );
};

export default Hotel;
