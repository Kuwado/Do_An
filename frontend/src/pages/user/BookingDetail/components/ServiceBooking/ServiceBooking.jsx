import classNames from 'classnames/bind';

import styles from './ServiceBooking.module.scss';
import Accordion from '@/components/Accordion/Accordion';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ServiceBookingCard } from '@/constants/Card';

const cx = classNames.bind(styles);

const ServiceBooking = ({
    forwardedRef,
    bookedServices,
    pendingServices,
    chosenType,
    setChosenType,
    fetchPendingServiceBooking,
}) => {
    return (
        <div ref={forwardedRef} className={cx('service-booking')}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faBellConcierge} />
                <div>Dịch vụ</div>
            </div>

            <Accordion header={<div className={cx('service-title')}>Dịch vụ đã đặt</div>} defaultOpen>
                <div className={cx('service-list')}>
                    {bookedServices &&
                        bookedServices.length > 0 &&
                        bookedServices.map((sv) => <ServiceBookingCard key={`booked-service-${sv.id}`} service={sv} />)}

                    {bookedServices.length == 0 && <div>Hiện tại chưa đặt dịch vụ nào</div>}
                </div>
            </Accordion>

            <Accordion header={<div className={cx('service-title')}>Dịch vụ chờ xác nhận</div>}>
                <div className={cx('service-list')}>
                    {pendingServices.length > 0 &&
                        pendingServices.map((sv) => (
                            <ServiceBookingCard
                                key={`pending-service-${sv.id}`}
                                service={sv}
                                pending
                                onDelete={fetchPendingServiceBooking}
                            />
                        ))}

                    {pendingServices.length == 0 && <div>Hiện tại không có dịch vụ nào đang chờ xác nhận</div>}
                </div>
            </Accordion>
        </div>
    );
};

export default ServiceBooking;
