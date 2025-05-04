import classNames from 'classnames/bind';

import styles from './ServiceSelection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faFaceSmileBeam, faWaterLadder } from '@fortawesome/free-solid-svg-icons';
import { ServiceCard } from '@/constants/Card';

const cx = classNames.bind(styles);

const ServiceList = ({ type, setType, services, serviceList, setChosenService }) => {
    const handleChangeType = (changedType) => {
        setType(changedType);
    };

    return (
        <div className={cx('selection')}>
            <div className={cx('type-selection')}>
                <div
                    className={cx('type-item', { active: type === 'dining' })}
                    onClick={() => handleChangeType('dining')}
                >
                    <FontAwesomeIcon className={cx('icon')} icon={faBellConcierge} />
                    <div>Ăn uống {services.totalDining && `(${services.totalDining})`}</div>
                </div>
                <div
                    className={cx('type-item', { active: type === 'entertainment' })}
                    onClick={() => handleChangeType('entertainment')}
                >
                    <FontAwesomeIcon className={cx('icon')} icon={faFaceSmileBeam} />
                    <div>Giải trí {services.totalEntertainment && `(${services.totalEntertainment})`}</div>
                </div>
                <div
                    className={cx('type-item', { active: type === 'facilities' })}
                    onClick={() => handleChangeType('facilities')}
                >
                    <FontAwesomeIcon className={cx('icon')} icon={faWaterLadder} />
                    <div>Tiện nghi {services.totalFacilities && `(${services.totalFacilities})`}</div>
                </div>
            </div>

            <div className={cx('service-list')}>
                {serviceList &&
                    serviceList.length > 0 &&
                    serviceList.map((service) => (
                        <div
                            key={`service-${service.id}`}
                            className={cx('service-item')}
                            onClick={() => setChosenService(service)}
                        >
                            <ServiceCard service={service} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ServiceList;
