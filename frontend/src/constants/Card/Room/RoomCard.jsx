import classNames from 'classnames/bind';

import styles from './RoomCard.module.scss';
import images from '@/assets/images';
import FullScreenSlider from '../../Slider/FullScreen/FullScreenSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faMountainCity, faPersonBooth, faRulerCombined, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { formatPrice } from '@/utils/stringUtil';

const IMAGES = [images.hotel, images.hotel, images.hotel, images.hotel];

const cx = classNames.bind(styles);

const RoomCard = ({ room }) => {
    return (
        <div className={cx('room-card')}>
            <div className={cx('name')}>{room.name}</div>
            <div className={cx('content')}>
                <div className={cx('content-item', 'images')}>
                    <FullScreenSlider className="hover card" images={IMAGES} height="100%" autoPlay={false} />
                </div>

                <div className={cx('content-item')}>
                    <div className={cx('item')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faRulerCombined} />
                        {room.area} m²
                    </div>
                    <div className={cx('item')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
                        {room.capacity} người
                    </div>
                    <div
                        className={cx('des')}
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 9,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {room.description}
                    </div>
                </div>

                <div className={cx('content-item')}>
                    <div className={cx('amenity-part')}>
                        <div className={cx('item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faMountainCity} />
                            View phòng
                        </div>
                        <ul>
                            {room.amenities &&
                                room.amenities.view &&
                                room.amenities.view.map((amt) => <li key={`amenity-view-${amt.id}`}>{amt.name}</li>)}
                        </ul>
                    </div>
                    <div className={cx('amenity-part')}>
                        <div className={cx('item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBath} />
                            Tiện nghi phòng
                        </div>
                        <ul>
                            {room.amenities &&
                                room.amenities.bathroom &&
                                room.amenities.bathroom.map((amt) => (
                                    <li key={`amenity-bath-${amt.id}`}>{amt.name}</li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className={cx('content-item', 'last-item')}>
                    <div className={cx('price')}>{formatPrice(room.price)}</div>
                    <div className={cx('available-rooms')}>
                        {room.available_rooms > 0 ? `Còn lại ${room.available_rooms} phòng trống` : 'Hết phòng'}
                    </div>

                    <div className={cx('action-btns')}>
                        <Button primaryBorder>Chi tiết</Button>
                        <Button secondary noClick={room.available_rooms === 0}>
                            Đặt phòng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
