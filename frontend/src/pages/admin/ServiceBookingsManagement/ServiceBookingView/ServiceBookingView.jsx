import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceBookingView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/stringUtil';
import { cancelServiceBooking, confirmServiceBooking } from '@/services/ServiceHotelService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const FILTER_STATUS = {
    '': 'Tất cả',
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Đã hoàn thành',
};

const ServiceBookingView = ({ serviceBooking = {}, fetchserviceBookings }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button className={cx('view-btn')} small onClick={() => setShow(true)}>
                <VisibilityIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('service-booking-view')}>
                    <div className={cx('status', serviceBooking.status)}>{FILTER_STATUS[serviceBooking.status]}</div>
                    <div className={cx('title')}>Thông tin đơn dịch vụ</div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Khách hàng:</div>
                        <div className={cx('item-content')}>
                            {serviceBooking.booking.user.first_name} {serviceBooking.booking.user.last_name}
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Số điện thoại:</div>
                        <div className={cx('item-content')}>{serviceBooking.booking.user.phone}</div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Email:</div>
                        <div className={cx('item-content')}>{serviceBooking.booking.user.email}</div>
                    </div>

                    <div className={cx('break')}></div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Tên dịch vụ:</div>
                        <div className={cx('item-content')}>{serviceBooking.service.name}</div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Số lượng:</div>
                        <div className={cx('item-content')}>{serviceBooking.quantity} suất</div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Ngày dùng:</div>
                        <div className={cx('item-content')}>{formatDate(serviceBooking.date)}</div>
                    </div>

                    <div className={cx('break')}></div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Đơn đặt:</div>
                        <Link to={`/admin/bookings/${serviceBooking.booking.id}`} className={cx('booking-link')}>
                            #{serviceBooking.booking.id}
                        </Link>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default ServiceBookingView;
