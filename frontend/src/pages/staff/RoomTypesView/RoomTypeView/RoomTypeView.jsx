import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomTypeView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import images from '@/assets/images';
import { formatPrice } from '@/utils/stringUtil';

const cx = classNames.bind(styles);

const RoomTypeView = ({ roomType = {} }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button className={cx('view-btn')} small onClick={() => setShow(true)}>
                <VisibilityIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('room-type-view')}>
                    <div className={cx('title')}>Thông tin loại phòng</div>

                    <div className={cx('slider')}>
                        <FullScreenSlider
                            className="hover card"
                            images={roomType.images || [images.noImage]}
                            height="100%"
                            autoPlay={false}
                        />
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Tên phòng:</div>
                        <div className={cx('item-content')}>{roomType.name}</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Số người:</div>
                        <div className={cx('item-content')}>{roomType.capacity} người</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Diện tích:</div>
                        <div className={cx('item-content')}>{roomType.area} m²</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Giá phòng:</div>
                        <div className={cx('item-content')}>{formatPrice(roomType.price)}</div>
                    </div>

                    <div className={cx('item', 'des')}>
                        <div className={cx('item-title')}>Mô tả về phòng:</div>
                        <div className={cx('item-content')}>
                            {roomType.description} {roomType.description} {roomType.description} {roomType.description}{' '}
                            {roomType.description} {roomType.description} {roomType.description} {roomType.description}{' '}
                            {roomType.description}
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default RoomTypeView;
