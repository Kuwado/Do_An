import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HotelCard.module.scss';
import images from '@/assets/images';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../../utils/stringUtil';

const cx = classNames.bind(styles);

const HotelCard = ({ hotel = {} }) => {
    return (
        <div className={cx('hotel-card')}>
            <div className={cx('avatar')}>
                <img src={hotel.avatar ?? images.hotel} alt="hotel-avatar" />
                <div className={cx('city')}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{hotel.city}</span>
                </div>
            </div>

            <div className={cx('information')}>
                <Link className={cx('name')} to={`/hotel/${hotel.id}`}>
                    {hotel.name}
                </Link>
                <div className={cx('price')}>{formatPrice(hotel.average_price)}</div>
                <div
                    className={cx('des')}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {hotel.description}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
