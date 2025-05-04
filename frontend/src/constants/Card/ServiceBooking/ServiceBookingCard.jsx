import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceBookingCard.module.scss';
import Accordion from '@/components/Accordion/Accordion';
import images from '@/assets/images';
import FullScreenSlider from '../../Slider/FullScreen/FullScreenSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faNewspaper, faSignature } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '@/utils/stringUtil';
import ServiceBookingList from './ServiceBookingList';

const cx = classNames.bind(styles);

const IMAGES = [images.service, images.service, images.service, images.service];

const ServiceBookingCard = ({ service = {}, pending = false, onDelete = () => {} }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (service.status === 'pending') {
            setStatus('Đang chờ');
        } else if (service.status === 'cancelled') {
            setStatus('Đã hủy');
        } else if (service.status === 'confirmed') {
            setStatus('Đã xác nhận');
        } else if (service.status === 'completed') {
            setStatus('Hoàn thành');
        }
    }, [service.status]);

    return (
        <div className={cx('service-booking-card')}>
            <Accordion
                header={
                    <div className={cx('header-content')}>
                        <div className={cx('images')}>
                            <FullScreenSlider
                                className="hover card"
                                images={service.images || IMAGES}
                                height="100%"
                                autoPlay={false}
                            />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faSignature} />
                                <div className={cx('content')}>{service.name}</div>
                            </div>
                            <div className={cx('info-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMoneyBill} />
                                <div className={cx('content')}>{formatPrice(service.price)} / người</div>
                            </div>
                            <div className={cx('info-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faNewspaper} />
                                <div
                                    className={cx('content', 'des')}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {service.description}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <ServiceBookingList
                    id={service.id}
                    serviceBookings={service.service_bookings}
                    pending={pending}
                    onDelete={onDelete}
                />
            </Accordion>
        </div>
    );
};

export default ServiceBookingCard;
