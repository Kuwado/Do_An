import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BookingInfo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBed,
    faClock,
    faEnvelope,
    faLocationDot,
    faMoneyBill,
    faPhone,
    faRulerCombined,
    faSignature,
    faTicket,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import images from '@/assets/images';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import Rating from '@/constants/Rating';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import { updateBooking } from '@/services/BookingService';
import { checkVoucher } from '@/services/VoucherService';
import { formatDate, getDaysBetween } from '@/utils/dateUtil';
import { formatPrice } from '@/utils/stringUtil';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const ROOMIMAGES = [images.room, images.room, images.room, images.room, images.room];

const BookingInfo = ({ forwardedRef, booking = {}, onUpdate }) => {
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (booking.status === 'pending') {
            setStatus('Đang chờ');
        } else if (booking.status === 'cancelled') {
            setStatus('Đã hủy');
        } else if (booking.status === 'confirmed') {
            setStatus('Đã xác nhận');
        } else if (booking.status === 'completed') {
            setStatus('Hoàn thành');
        } else if (booking.status === 'using') {
            setStatus('Đang sử dụng');
        }
    }, [booking.status]);

    const applyVoucher = async () => {
        const res = await checkVoucher({
            hotelId: booking.hotel.id,
            code: code,
            type: 'room',
        });
        if (res.success) {
            const updateRes = await updateBooking(booking.id, { voucher_id: res.voucher.id });
            if (updateRes.success) {
                toast.success('Áp dụng voucher thành công');
                setCodeError(null);
                onUpdate();
            } else {
                setCodeError(updateRes.message);
            }
        } else {
            setCodeError(res.message);
        }
    };

    return (
        <div className={cx('booking-info')} ref={forwardedRef}>
            <div className={cx('room')}>
                <div className={cx('title-container')}>
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faBed} />
                        <div>Thông tin phòng</div>
                    </div>

                    <div className={cx('status', `${booking.status}`)}>{status}</div>
                </div>

                <div className={cx('info-container')}>
                    <div className={cx('images')}>
                        <FullScreenSlider
                            className="hover card"
                            images={booking.room?.room_type?.images || ROOMIMAGES}
                            height="100%"
                            autoPlay={false}
                            link={booking.room?.room_type?.images ? true : false}
                        />
                    </div>

                    <div className={cx('info-content')}>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faSignature} />
                            <div className={cx('content')}>{booking.room?.room_type.name}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faRulerCombined} />
                            <div className={cx('content')}>{booking.room?.room_type.area} m²</div>
                        </div>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
                            <div className={cx('content')}>{booking.room?.room_type.capacity} người</div>
                        </div>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                            <div className={cx('content')}>
                                Từ {formatDate(booking.check_in)} đến {formatDate(booking.check_out)} (
                                {getDaysBetween(booking.check_in, booking.check_out)} đêm)
                            </div>
                        </div>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faMoneyBill} />
                            <div className={cx('content')}>{formatPrice(booking.room?.room_type.price)} / đêm</div>
                        </div>
                        {booking.voucher_id ? (
                            <div className={cx('info-item', 'voucher-applied')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTicket} />
                                <div className={cx('content')}>{booking.voucher?.name}</div>
                            </div>
                        ) : (
                            (booking.status === 'pending' || booking.status === 'confirmed') && (
                                <div className={cx('voucher')}>
                                    <Input className={cx('input')} value={code} setValue={setCode} label="Voucher" />
                                    <Button className={cx('btn')} secondary curved small onClick={() => applyVoucher()}>
                                        Áp dụng
                                    </Button>
                                </div>
                            )
                        )}
                        {codeError && <div style={{ color: 'red' }}>{codeError}</div>}
                    </div>
                </div>
            </div>

            <div className={cx('hotel')}>
                <div className={cx('hotel-name')}>{booking.hotel?.name}</div>
                <Rating rate={booking.hotel?.rating} />
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                    <div>{booking.hotel?.address}</div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                    <div>{booking.hotel?.email}</div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                    <div>{booking.hotel?.phone}</div>
                </div>
                <div className={cx('view-btn-container')}>
                    <Button secondary to={`/hotels/${booking.hotel_id}`}>
                        Xem chi tiết khách sạn
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
