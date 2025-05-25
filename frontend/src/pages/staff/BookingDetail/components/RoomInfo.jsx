import classNames from 'classnames/bind';

import styles from '../BookingDetail.module.scss';
import { formatPrice } from '../../../../utils/stringUtil';

const cx = classNames.bind(styles);

const RoomInfo = ({ room }) => {
    return (
        <div className={cx('booking-part', 'room')}>
            <div className={cx('part-title')}>Thông tin phòng</div>
            <div className={cx('part-content')}>
                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Loại phòng:</div>
                    <div>{room.room_type.name}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số phòng:</div>
                    <div>{room.room_number}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số khách:</div>
                    <div>{room.room_type.capacity} người</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Diện tích:</div>
                    <div>{parseInt(room.room_type.area)}m²</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Giá phòng:</div>
                    <div>{formatPrice(room.room_type.price)}/đêm</div>
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;
