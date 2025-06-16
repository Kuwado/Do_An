import classNames from 'classnames/bind';

import styles from './BookingCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill, faRulerCombined, faUsers } from '@fortawesome/free-solid-svg-icons';
import Image from '@/components/Image';
import images from '@/assets/images';
import { formatDate, getDaysBetween } from '@/utils/dateUtil';
import { formatPrice } from '@/utils/stringUtil';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';

const cx = classNames.bind(styles);

const BookingCard = ({ booking = {} }) => {
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

    return (
        <div className={cx('booking-card')}>
            <div className={cx('avatar')}>
                <Image src={booking.room.room_type.avatar || images.room} alt="avatar-room" />
            </div>
            <div className={cx('booking-info')}>
                <div
                    className={cx('name')}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {booking.room.room_type.name}
                </div>
                <div className={cx('booking-info-detail')}>
                    <div className={cx('detail-content')}>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faRulerCombined} />
                            <div className={cx('content')}>{booking.room.room_type.area} m²</div>
                        </div>
                        <div className={cx('info-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
                            <div className={cx('content')}>{booking.room.room_type.capacity} người</div>
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
                            <div className={cx('content')}>{formatPrice(booking.room.room_type.price)} / đêm</div>
                        </div>
                    </div>

                    <div className={cx('detail-content', 'price')}>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Tiền phòng:</div>
                            {!booking.voucher_id ? (
                                <div className={cx('content')}>{formatPrice(booking.room_amount)}</div>
                            ) : (
                                <div className={cx('discount')}>
                                    <div className={cx('original')}>{formatPrice(booking.total_room_price)}</div>
                                    <div className={cx('final')}>{formatPrice(booking.room_amount)}</div>
                                </div>
                            )}
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Tiền dịch vụ:</div>
                            <div className={cx('content')}>{formatPrice(booking.service_amount)}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Tổng tiền:</div>
                            <div className={cx('content')}>{formatPrice(booking.total_amount)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('actions')}>
                <div className={cx('status', `${booking.status}`)}>{status}</div>
                <Button secondary to={`/bookings/${booking.id}`}>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
};

export default BookingCard;
