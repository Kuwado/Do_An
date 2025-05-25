import classNames from 'classnames/bind';

import styles from '../BookingDetail.module.scss';
import { Button } from '@/components/Button';
import { formatDate, formatPrice } from '@/utils/stringUtil';
import { getDaysBetween } from '@/utils/dateUtil';
import { cancelBooking, completeBooking, confirmBooking } from '../../../../services/BookingService';

const cx = classNames.bind(styles);

const FILTER_STATUS = {
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Đã hoàn thành',
};

const ServiceBookings = ({ serviceBookings = [] }) => {
    return (
        <div className={cx('booking-part', 'service-bookings')}>
            <div className={cx('part-title')}>Thông tin dịch vụ ({serviceBookings.length})</div>

            {serviceBookings.length > 0 ? (
                <table className={cx('service-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên dịch vụ</th>
                            <th>Ngày dùng</th>
                            <th>SL</th>
                        </tr>
                    </thead>

                    <tbody>
                        {serviceBookings.map((serviceBooking, index) => (
                            <tr key={`service-history-${serviceBooking.id}`}>
                                <td>{index + 1}</td>
                                <td>{serviceBooking.service.name}</td>
                                <td>{formatDate(serviceBooking.date)}</td>
                                <td>{serviceBooking.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Chưa có dịch vụ nào được đặt</div>
            )}
        </div>
    );
};

export default ServiceBookings;
