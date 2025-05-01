import classNames from 'classnames/bind';

import styles from './Rooms.module.scss';
import RoomCard from '@/constants/Card/Room/RoomCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Rooms = ({ rooms = {}, forwardedRef, checkIn, checkOut }) => {
    return (
        <div ref={forwardedRef} className={cx('hotel-rooms')}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faBed} />
                <span>Danh sách phòng</span>
            </div>
            <div className={cx('content')}>
                {rooms.length > 0 &&
                    rooms.map((room) => (
                        <RoomCard key={`room-${room.id}`} room={room} checkIn={checkIn} checkOut={checkOut} />
                    ))}
            </div>
        </div>
    );
};

export default Rooms;
