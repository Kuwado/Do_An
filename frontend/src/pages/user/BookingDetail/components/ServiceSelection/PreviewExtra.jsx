import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceSelection.module.scss';
import { IconButton } from '@/components/Button';
import { formatPrice } from '@/utils/stringUtil';
import { formatDate, getDaysBetween } from '@/utils/dateUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const PreviewExtra = ({
    chosenService = {},
    booking,
    voucher,
    quantity,
    dateType,
    date,
    total,
    finalTotal,
    serviceHistory,
}) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={cx('preview-extra', { show: showMore })}>
            <div className={cx('preview-extra-content')}>
                <div className={cx('preview-extra-part', 'bill')}>
                    <div className={cx('preview-title')}>Hóa đơn</div>

                    <div className={cx('preview-content')}>
                        <div className={cx('bill-item')}>
                            <div className={cx('bill-title')}>Giá tiền: </div>
                            <div className={cx('bill-price')}> {formatPrice(chosenService.price)} / người</div>
                        </div>

                        <div className={cx('bill-item')}>
                            <div className={cx('bill-title')}>Thời gian: </div>
                            <div>
                                {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                            </div>
                        </div>

                        <div className={cx('bill-item')}>
                            <div className={cx('bill-title')}>Ngày dùng: </div>
                            {dateType === 'one'
                                ? `${formatDate(date)} (1 ngày)`
                                : `Tất cả (${getDaysBetween(booking.check_in, booking.check_out)} ngày)`}
                        </div>

                        <div className={cx('bill-item')}>
                            <div className={cx('bill-title')}>Số lượng: </div>
                            <div>{quantity} người</div>
                        </div>

                        {voucher ? (
                            <>
                                <div className={cx('bill-item')}>
                                    <div className={cx('bill-title')}>Voucher: </div>
                                    <div className={cx('bill-voucher')}>{voucher.name}</div>
                                </div>

                                <div className={cx('bill-item', 'price-item')}>
                                    <div className={cx('bill-title')}>Tổng tiền: </div>
                                    <div className={cx('bill-price-container')}>
                                        <div className={cx('bill-original-price')}>{formatPrice(total)}</div>
                                        <div className={cx('bill-price')}>{formatPrice(finalTotal)}</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={cx('bill-item')}>
                                <div className={cx('bill-title')}>Tổng tiền: </div>
                                <div className={cx('bill-price')}>{formatPrice(total)}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('preview-extra-part', 'history')}>
                    <div className={cx('preview-title')}>Lịch sử đặt</div>

                    <div className={cx('preview-content')}>
                        {serviceHistory.length > 0 ? (
                            <table className={cx('history-table')}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ngày dùng</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {serviceHistory.map((service, index) => (
                                        <tr key={`service-history-${service.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(service.date)}</td>
                                            <td>{service.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>Bạn chưa đặt dịch vụ này</div>
                        )}
                    </div>
                </div>
            </div>

            <IconButton className={cx('show-more-btn')} secondaryBorder onClick={() => setShowMore(!showMore)}>
                <FontAwesomeIcon icon={showMore ? faChevronLeft : faChevronRight} />
            </IconButton>
        </div>
    );
};

export default PreviewExtra;
