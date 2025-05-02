import { useState } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faMoneyBill,
    faRulerCombined,
    faSignature,
    faTicket,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

import styles from './BookingInfo.module.scss';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import Rating from '@/constants/Rating';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { formatDate, getDaysBetween } from '@/utils/dateUtil';
import { formatPrice } from '@/utils/stringUtil';
import images from '@/assets/images';

const cx = classNames.bind(styles);

const IMAGES = [images.room, images.room, images.room, images.room];

const BookingInfo = ({ hotel, room, voucher, setVoucher, checkIn, checkOut }) => {
    const [code, setCode] = useState('');

    const getTotalAmount = () => {
        let total = room.price * getDaysBetween(checkIn, checkOut);
        if (voucher) {
            if (voucher.discount_type === 'percent') {
                total = Math.round((total * voucher.discount) / 100);
            } else if (voucher.discount_type === 'fixed') {
                total -= voucher.discount;
            }
        }
        return formatPrice(total);
    };

    return (
        <div className={cx('booking-info')}>
            <div className={cx('hotel-name-container')}>
                <div className={cx('hotel-name')}>{hotel.name}</div>
                <Rating rate={hotel.rating} />
            </div>
            <div className={cx('images')}>
                <FullScreenSlider
                    className="hover card"
                    images={room.images || IMAGES}
                    height="100%"
                    autoPlay={false}
                />
            </div>
            <div className={cx('room-info')}>
                <div className={cx('info-item', 'name')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faSignature} />
                    <div className={cx('content')}>{room.name}</div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faRulerCombined} />
                    <div className={cx('content')}>{room.area} m²</div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
                    <div className={cx('content')}>{room.capacity} người</div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    <div className={cx('content')}>
                        Từ {formatDate(checkIn)} đến {formatDate(checkOut)} ({getDaysBetween(checkIn, checkOut)} đêm)
                    </div>
                </div>
                <div className={cx('info-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faMoneyBill} />
                    <div className={cx('content')}>{formatPrice(room.price)} / đêm</div>
                </div>

                {voucher?.discount && (
                    <div className={cx('info-item', 'voucher-applied')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faTicket} />
                        <div className={cx('content')}>{voucher.name}</div>
                    </div>
                )}
            </div>

            <div className={cx('voucher')}>
                <Input className={cx('input')} value={code} setValue={setCode} label="Voucher" />
                <Button className={cx('btn')} secondary curved small>
                    Áp dụng
                </Button>
            </div>

            <div className={cx('total')}>
                <div className={cx('title')}>Tổng tiền:</div>
                <div className={cx('amount')}>
                    {voucher?.discount && (
                        <div className={cx('before')}>
                            {formatPrice(room.price * getDaysBetween(checkIn, checkOut))}
                        </div>
                    )}
                    <div className={cx('final')}>{getTotalAmount()}</div>
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
