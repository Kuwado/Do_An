import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceSelection.module.scss';
import { getDefaultDate, getDaysBetween } from '@/utils/dateUtil';
import { getServicesByHotelId } from '@/services/ServiceHotelService';
import { checkVoucher } from '@/services/VoucherService';
import PreviewMain from './PreviewMain';
import PreviewExtra from './PreviewExtra';
import ServiceList from './ServiceList';
import { createServiceBooking } from '@/services/BookingService';
import { getServiceBookingsHistory } from '@/services/ServiceHotelService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ServiceSelection = ({ booking, fetchServiceBookings }) => {
    const [type, setType] = useState('dining');
    const [chosenService, setChosenService] = useState(null);
    const [services, setServices] = useState({});
    const [serviceList, setServiceList] = useState([{}]);
    const [serviceHistory, setServiceHistory] = useState([]);
    const [quantity, setQuantity] = useState(booking.room.room_type.capacity || 1);
    const [dateType, setDateType] = useState('one');
    const [date, setDate] = useState(getDefaultDate(booking.check_in));
    const [total, setTotal] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [codeError, setCodeError] = useState(null);

    // Lấy danh sách service của khách sạn
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const res = await getServicesByHotelId({ hotelId: booking.hotel_id });
            if (!res.success) {
                setError(res.message);
            } else {
                setServices(res.services);
                setServiceList(res.services[type]);
                setError(null);
            }
            setLoading(false);
        };

        if (booking.hotel_id) fetchServices();
    }, [booking]);

    // Cập nhật ds service theo loại
    useEffect(() => {
        if (services != {}) {
            setServiceList(services[type]);
        }
    }, [type]);

    const applyVoucher = async () => {
        const res = await checkVoucher({
            hotelId: booking.hotel.id,
            code: voucher.code,
            type: 'service',
            originalPrice: total,
        });
        if (res.success) {
            setFinalTotal(res.final_amount);
        }
    };

    useEffect(() => {
        if (chosenService) {
            if (dateType === 'all') {
                const dayCount = getDaysBetween(booking.check_in, booking.check_out);
                const totalPrice = dayCount * chosenService.price * quantity;
                setTotal(totalPrice);
            } else {
                setTotal(chosenService.price * quantity);
            }
        }
    }, [dateType, quantity, chosenService]);

    useEffect(() => {
        if (voucher) {
            applyVoucher();
        } else {
            setFinalTotal(total);
        }
    }, [total]);

    useEffect(() => {
        if (dateType === 'all') {
            setVoucher(null);
        }
    }, [dateType]);

    const fetchHistory = async () => {
        const res = await getServiceBookingsHistory({ bookingId: booking.id, serviceId: chosenService.id });
        if (res.success) {
            setServiceHistory(res.services);
        } else {
            setServiceHistory([]);
        }
    };

    useEffect(() => {
        if (chosenService) {
            fetchHistory();
        }
    }, [chosenService]);

    const handleBookService = async () => {
        const cf = confirm(`Bạn có chắc muốn đặt dịch vụ ${chosenService.name} không?`);
        if (cf) {
            if (dateType === 'one') {
                const res = await createServiceBooking({
                    bookingId: booking.id,
                    serviceId: chosenService.id,
                    quantity,
                    voucherId: voucher ? voucher.id : '',
                    date,
                });
                if (res.success) {
                    toast.success('Thêm dịch vụ thành công');
                } else {
                    toast.error('Thêm dịch vụ thất bại');
                }
            } else if (dateType === 'all') {
                const checkIn = new Date(booking.check_in);
                const checkOut = new Date(booking.check_out);
                const days = [];

                for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
                    days.push(new Date(d));
                }

                const results = await Promise.all(
                    days.map((d) =>
                        createServiceBooking({
                            bookingId: booking.id,
                            serviceId: chosenService.id,
                            quantity,
                            date: d.toISOString().split('T')[0],
                        }),
                    ),
                );

                const successCount = results.filter((r) => r.success).length;
                toast.success(`Đã thêm dịch vụ cho ${successCount}/${days.length} ngày thành công`);
            }

            fetchServiceBookings();
            fetchHistory();
        }
    };

    return (
        <div className={cx('service-selection')}>
            <div className={cx('title')}>Thêm dịch vụ</div>

            <div className={cx('content')}>
                <div className={cx('preview')}>
                    <PreviewMain
                        chosenService={chosenService}
                        booking={booking}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        dateType={dateType}
                        setDateType={setDateType}
                        date={date}
                        setDate={setDate}
                        total={total}
                        setFinalTotal={setFinalTotal}
                        voucher={voucher}
                        setVoucher={setVoucher}
                        handleBookService={handleBookService}
                    />

                    {chosenService && Object.keys(chosenService).length > 0 && (
                        <PreviewExtra
                            chosenService={chosenService}
                            booking={booking}
                            voucher={voucher}
                            quantity={quantity}
                            dateType={dateType}
                            date={date}
                            total={total}
                            finalTotal={finalTotal}
                            serviceHistory={serviceHistory}
                        />
                    )}
                </div>

                <ServiceList
                    type={type}
                    setType={setType}
                    services={services}
                    serviceList={serviceList}
                    setChosenService={setChosenService}
                />
            </div>
        </div>
    );
};

export default ServiceSelection;
