import classNames from 'classnames/bind';

import styles from './ServiceBookingCard.module.scss';
import { formatDate } from '@/utils/dateUtil';
import { formatPrice } from '@/utils/stringUtil';
import { IconButton } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateServiceBooking } from '@/services/ServiceHotelService';

const cx = classNames.bind(styles);

const ServiceBookingList = ({ id = '', serviceBookings = [], pending = false, onDelete }) => {
    const getStatus = (status) => {
        if (status === 'pending') {
            return 'Đang chờ';
        } else if (status === 'cancelled') {
            return 'Đã hủy';
        } else if (status === 'confirmed') {
            return 'Đã xác nhận';
        } else if (status === 'completed') {
            return 'Hoàn thành';
        }
    };

    const handleCancelService = async (id) => {
        const confirmed = confirm('Bạn có chắc muốn hủy dịch vụ này không?');
        if (confirmed) {
            const res = await updateServiceBooking(id, { status: 'cancelled' });
            onDelete();
        }
    };

    return (
        <table className={cx('service-booking-list')}>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Voucher</th>
                    <th>Giá tiền</th>
                    {pending && <th>Hủy</th>}
                </tr>
            </thead>
            <tbody>
                {serviceBookings &&
                    serviceBookings.length > 0 &&
                    serviceBookings.map((serviceBooking, index) => (
                        <tr key={`service-booking-${id}-${serviceBooking.id}`}>
                            <td>{index + 1}</td>
                            <td>{formatDate(serviceBooking.date)}</td>
                            <td>{serviceBooking.quantity}</td>
                            <td>
                                <div className={cx('status', `${serviceBooking.status}`)}>
                                    {getStatus(serviceBooking.status)}
                                </div>
                            </td>
                            <td>{serviceBooking.voucher?.name ?? 'Không có'}</td>
                            <td>{formatPrice(serviceBooking.final_amount)}</td>
                            {pending && (
                                <td>
                                    <IconButton
                                        className={cx('delete-btn')}
                                        onClick={() => handleCancelService(serviceBooking.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </IconButton>
                                </td>
                            )}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default ServiceBookingList;
