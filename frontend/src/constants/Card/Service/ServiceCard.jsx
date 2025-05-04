import classNames from 'classnames/bind';

import styles from './ServiceCard.module.scss';
import images from '@/assets/images';
import Image from '@/components/Image';
import { formatPrice } from '@/utils/stringUtil';

const cx = classNames.bind(styles);

const ServiceCard = ({ service = {} }) => {
    return (
        <div className={cx('service-card')}>
            <div className={cx('avatar')}>
                <Image src={service.images && service.images.length > 0 ? service.images[0] : images.service} />
            </div>

            <div className={cx('service-info')}>
                <div className={cx('name')}>{service.name}</div>
                <div className={cx('price')}>{formatPrice(service.price)} / người</div>
                <div
                    className={cx('des')}
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
    );
};

export default ServiceCard;
