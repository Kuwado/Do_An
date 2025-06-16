import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingPayment.module.scss';
import Timer from '@/constants/Timer/Timer';
import { Button } from '@/components/Button';
import { updateBooking } from '@/services/BookingService';
import { handlePayment } from '@/services/PaymentService';
import Image from '@/components/Image';
import images from '@/assets/images';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Payment = ({ countDownTime, setBookingId, total }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hotelId } = useParams();
    const [createdAt, setCreatedAt] = useState(localStorage.getItem('booking_created_at') || '');
    const [method, setMethod] = useState('offline');
    const [amount, setAmount] = useState(localStorage.getItem('booking_total') || 0);
    const [canNext, setCanNext] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [expired, setExpired] = useState(false);

    console.log(amount);

    useEffect(() => {
        const createdTime = localStorage.getItem('booking_created_at');
        setCreatedAt(createdTime);
        if (createdTime) {
            const expireAt = new Date(createdTime).getTime() + countDownTime * 60 * 1000;
            const now = new Date().getTime();
            const diff = expireAt - now;
            if (diff <= 0) {
                setExpired(true);
            } else {
                setExpired(false);
            }
        } else {
            setExpired(true);
        }
    }, []);

    const handleClearCountDown = () => {
        localStorage.removeItem('pending_booking_id');
        localStorage.removeItem('booking_created_at');
        localStorage.removeItem('booking_total');
        setExpired(true);
    };

    const handleCancel = async () => {
        const cf = confirm('Bạn có chắc muốn hủy đặt phòng không?');
        if (cf) {
            const bookingId = localStorage.getItem('pending_booking_id');
            const res = await updateBooking(bookingId, { status: 'expired' });
            if (!res.success) {
                toast.error(res.message);
            } else {
                toast.success('Hủy đặt phòng thành công');
                localStorage.removeItem('pending_booking_id');
                localStorage.removeItem('booking_created_at');
                navigate(-1);
            }
        }
    };

    const handleComplete = async () => {
        const bookingId = localStorage.getItem('pending_booking_id');
        const res = await updateBooking(bookingId, { expired_at: null });
        if (!res.success) {
            toast.error(res.message);
        } else {
            // handleClearCountDown();
            // setBookingId(bookingId);
            navigate(`/hotels/${hotelId}/booking-completed`);
        }
    };

    const handleReBooking = () => {
        navigate(`/hotels/${hotelId}`);
    };

    useEffect(() => {
        if (method === 'online-50') {
            if (total) setAmount(total / 2);
            setCanNext(false);
            setShowQR(true);
        } else if (method === 'online-100') {
            if (total) setAmount(total);
            setCanNext(false);
            setShowQR(true);
        } else if (method === 'offline') {
            setShowQR(false);
            setCanNext(true);
        }
    }, [method]);

    useEffect(() => {
        if (total) setAmount(method === 'online-50' ? total / 2 : total);
    }, [total]);

    return (
        <>
            {!expired ? (
                <div className={cx('booking-left')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>Thanh toán đặt phòng</div>
                        <Timer start={createdAt} countDownTime={countDownTime} onClear={handleClearCountDown} />
                    </div>

                    <span className={cx('description')}>
                        Vui lòng chọn phương thức thanh toán. Với phương thức thanh toán trực tiếp quý khách sẽ được
                        nhân viên gọi điện hoặc gửi mail để xác nhận. Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.
                        Chúc quý khách một ngày tốt lành.
                    </span>

                    <div className={cx('payment-method')}>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="online-50"
                                onChange={(e) => setMethod(e.target.value)}
                                checked={method === 'online-50'}
                            />
                            Đặt cọc 50% tiền phòng
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="online-100"
                                onChange={(e) => setMethod(e.target.value)}
                                checked={method === 'online-100'}
                            />
                            Thanh toán toàn bộ tiền phòng
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="offline"
                                onChange={(e) => setMethod(e.target.value)}
                                checked={method === 'offline'}
                            />
                            Thanh toán trực tiếp
                        </label>
                    </div>

                    {showQR && (
                        <div className={cx('vnpay')}>
                            <Image src={images.vnpay} alt="vnpay" />
                        </div>
                    )}

                    <div className={cx('action-btns')}>
                        <Button transparent primaryBorder width="150px" onClick={handleCancel}>
                            Hủy đặt
                        </Button>
                        {method === 'offline' && (
                            <Button secondary width="150px" noClick={!canNext} onClick={handleComplete}>
                                Hoàn thành
                            </Button>
                        )}
                        {(method === 'online-50' || method === 'online-100') && (
                            <Button
                                secondary
                                width="150px"
                                onClick={() =>
                                    handlePayment({
                                        amount,
                                        next: `/hotels/${hotelId}/booking-completed`,
                                        prev: location.pathname,
                                    })
                                }
                            >
                                Thanh toán
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className={cx('booking-left', 'expired')}>
                    <div>Đã hết thời gian giữ phòng. Vui lòng đặt lại</div>
                    <Button transparent primaryBorder width="150px" onClick={handleReBooking}>
                        Đặt lại phòng
                    </Button>
                </div>
            )}
        </>
    );
};

export default Payment;
