import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BookingPayment.module.scss';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/Button';
import { formatPrice, formatDate } from '@/utils/stringUtil';
import { getDaysBetween } from '@/utils/dateUtil';

const cx = classNames.bind(styles);

const BookingPayment = ({ forwardedRef, booking = {}, services = [] }) => {
    return (
        <div className={cx('booking-payment')} ref={forwardedRef}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faMoneyBill} />
                <div>Thanh toán</div>
            </div>

            <div className={cx('content')}>
                <div className={cx('bill-container')}>
                    <div className={cx('bill-big-title')}>Tiền phòng</div>
                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Giá phòng: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>{formatPrice(booking.room?.room_type?.price)} / đêm</div>
                    </div>

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Số đêm sử dụng: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>
                            {getDaysBetween(booking.check_in, booking.check_out)} đêm
                        </div>
                    </div>

                    {booking.voucher && (
                        <>
                            <div className={cx('bill-item')}>
                                <div className={cx('bill-title')}>Voucher: </div>
                                <div className={cx('bill-dot')}></div>
                                <div className={cx('bill-content', 'voucher')}>{booking.voucher.name}</div>
                            </div>

                            <div className={cx('bill-item')}>
                                <div className={cx('bill-title')}>Tổng tiền phòng ban đầu: </div>
                                <div className={cx('bill-dot')}></div>
                                <div className={cx('bill-content', 'original-price')}>
                                    {formatPrice(booking.total_room_price)}
                                </div>
                            </div>
                        </>
                    )}

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Tổng tiền phòng: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content', 'final-price')}>{formatPrice(booking.room_amount)}</div>
                    </div>
                </div>

                {services.length > 0 && (
                    <div className={cx('bill-container')}>
                        <div className={cx('bill-big-title')}>Tiền dịch vụ</div>

                        {services.map((service, index) => (
                            <div className={cx('bill-container')} key={`service-${service.id}`}>
                                <div className={cx('bill-small-title')}>
                                    {index + 1}. {service.name}
                                </div>

                                <table className={cx('service-table')}>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Ngày dùng</th>
                                            <th>Số lượng</th>
                                            <th>Giá dịch vụ</th>
                                            <th>Mã giảm giá</th>
                                            <th>Tổng tiền</th>
                                            <th>Tổng tiền cần trả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {service.service_bookings.length > 0 &&
                                            service.service_bookings.map((sb, index) => (
                                                <tr key={`service-booking-${sb.id}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{formatDate(sb.date)}</td>
                                                    <td>{sb.quantity} người</td>
                                                    <td>{formatPrice(service.price)}</td>
                                                    <td className={cx({ voucher: sb.voucher })}>
                                                        {sb.voucher ? sb.voucher.name : 'Không có'}
                                                    </td>
                                                    <td className={cx({ 'original-price': sb.voucher })}>
                                                        {formatPrice(sb.total_amount)}
                                                    </td>
                                                    <td className={cx('final-price')}>
                                                        {formatPrice(sb.final_amount)}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}

                <div className={cx('bill-container')}>
                    <div className={cx('bill-big-title')}>Thành tiền</div>
                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Tổng tiền phòng: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>{formatPrice(booking.room_amount)}</div>
                    </div>

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Tổng tiền dịch vụ: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>{formatPrice(booking.service_amount)}</div>
                    </div>

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Tổng tiền đơn đặt phòng: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>{formatPrice(booking.total_amount)}</div>
                    </div>

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Số tiền đã trả: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content')}>{formatPrice(booking.paid_amount)}</div>
                    </div>

                    <div className={cx('bill-item')}>
                        <div className={cx('bill-title')}>Số tiền cần trả: </div>
                        <div className={cx('bill-dot')}></div>
                        <div className={cx('bill-content', 'final-price')}>
                            {formatPrice(booking.total_amount - booking.paid_amount)}
                        </div>
                    </div>
                </div>

                <Button secondaryBorder width="100%" large>
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default BookingPayment;
