import classNames from 'classnames/bind';

import styles from '../BookingDetail.module.scss';
import { Button } from '@/components/Button';
import { formatDate, formatPrice } from '@/utils/stringUtil';
import { getDaysBetween } from '@/utils/dateUtil';
import { cancelBooking, completeBooking, confirmBooking } from '@/services/BookingService';
import { toast } from 'react-toastify';
import { checkedInBooking } from '@/services/BookingService';

const cx = classNames.bind(styles);

const FILTER_STATUS = {
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Đã hoàn thành',
    using: 'Đang dùng',
};

const BookingInfo = ({ booking, fetchBooking }) => {
    const handleConfirmBooking = async () => {
        const confirmed = confirm(`Bạn có chắc muốn xác nhận đơn này không`);
        if (confirmed) {
            const res = await confirmBooking(booking.id);
            if (res.success) {
                toast.success('Xác nhận đơn thành công');
                fetchBooking();
            } else {
                toast.error(res.message);
            }
        }
    };

    const handleCancelBooking = async () => {
        const confirmed = confirm(`Bạn có chắc muốn hủy đơn này không`);
        if (confirmed) {
            const res = await cancelBooking(booking.id);
            if (res.success) {
                toast.success('Hủy đơn thành công');
                fetchBooking();
            } else {
                toast.error(res.message);
            }
        }
    };

    const handleCompleteBooking = async () => {
        const confirmed = confirm(`Xác nhận đơn đặt đã hoàn thành`);
        if (confirmed) {
            const res = await completeBooking(booking.id);
            if (res.success) {
                toast.success('Xác nhận đơn hoàn thành thành công');
                fetchBooking();
            } else {
                toast.error(res.message);
            }
        }
    };

    const handleCheckedInBooking = async () => {
        const confirmed = confirm(`Bạn có chắc muốn check-in phòng này không`);
        if (confirmed) {
            const res = await checkedInBooking(booking.id);
            if (res.success) {
                toast.success('Check-in thành công');
                fetchBooking();
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('booking-part', 'booking-info')}>
            <div className={cx('part-title')}>Thông tin đơn đặt</div>

            <div className={cx('status', booking.status)}>{FILTER_STATUS[booking.status]}</div>

            <div className={cx('part-content')}>
                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Khách hàng:</div>
                    <div>
                        {booking.user?.first_name} {booking.user?.last_name}
                    </div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Loại phòng:</div>
                    <div>{booking.room.room_type.name}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số phòng:</div>
                    <div>{booking.room.room_number}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Ngày nhận phòng:</div>
                    <div>{formatDate(booking.check_in)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Ngày trả phòng:</div>
                    <div>{formatDate(booking.check_out)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Voucher:</div>
                    <div>{booking.voucher ? booking.voucher.name : 'Không có'}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số ngày dùng:</div>
                    <div>{getDaysBetween(booking.check_in, booking.check_out)} ngày</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Tổng tiền phòng:</div>
                    <div>{formatPrice(booking.room_amount)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Tổng tiền dịch vụ:</div>
                    <div>{formatPrice(booking.service_amount)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Tổng tiền:</div>
                    <div>{formatPrice(booking.total_amount)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số tiền đã trả:</div>
                    <div>{formatPrice(booking.paid_amount)}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số tiền cần trả:</div>
                    <div>{formatPrice(booking.total_amount - booking.paid_amount)}</div>
                </div>

                <div className={cx('action-btns')}>
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <Button className={cx('cancel-btn')} onClick={handleCancelBooking}>
                            Từ chối
                        </Button>
                    )}
                    {(booking.status === 'pending' || booking.status === 'cancelled') && (
                        <Button className={cx('confirm-btn')} onClick={handleConfirmBooking}>
                            Xác nhận
                        </Button>
                    )}
                    {booking.status === 'confirmed' && (
                        <Button className={cx('confirm-btn')} onClick={handleCheckedInBooking}>
                            Check-in
                        </Button>
                    )}
                    {booking.status === 'using' && (
                        <Button className={cx('confirm-btn')} onClick={handleCompleteBooking}>
                            Hoàn thành
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
