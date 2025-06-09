import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RoomDetail.module.scss';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import images from '@/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faBath,
    faMountainCity,
    faRulerCombined,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '@/utils/stringUtil';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;
const IMAGES = [images.room, images.room, images.room, images.room];

const RoomDetail = ({ room }) => {
    const [show, setShow] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState(room.images || IMAGES);
    const thumbnailRefs = useRef([]);

    useEffect(() => {
        if (room.images) setImages(room.images);
    }, [room.images]);

    useEffect(() => {
        // Khi currentIndex thay đổi thì scroll thumbnail tương ứng vào vùng nhìn thấy
        if (thumbnailRefs.current[currentIndex]) {
            thumbnailRefs.current[currentIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [currentIndex]);

    const handleSelectImage = (index) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Button primaryBorder onClick={() => setShow(true)}>
                Chi tiết
            </Button>

            <Popup show={show} setShow={setShow}>
                <div className={cx('room-detail')}>
                    <div className={cx('room-images')}>
                        {/* Ảnh lớn + nút trái/phải */}
                        <div className={cx('main-image-wrapper')}>
                            <button className={cx('nav-btn', 'left')} onClick={handlePrev}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <img
                                src={`${IMAGE_URL}${images[currentIndex]}`}
                                alt={`Ảnh ${currentIndex + 1}`}
                                className={cx('main-image')}
                            />
                            <button className={cx('nav-btn', 'right')} onClick={handleNext}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>

                        {/* Thumbnail */}
                        <div className={cx('thumbnail-list')}>
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    ref={(el) => (thumbnailRefs.current[index] = el)}
                                    src={`${IMAGE_URL}${img}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={cx('thumbnail', {
                                        active: index === currentIndex,
                                    })}
                                    onClick={() => handleSelectImage(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={cx('room-info')}>
                        <div className={cx('title')}>{room.name}</div>
                        <p className={cx('desc')}>{room.description}</p>
                        <div className={cx('meta')}>
                            <div>
                                <FontAwesomeIcon icon={faRulerCombined} /> Diện tích: {room.area} m²
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUsers} /> Sức chứa: {room.capacity} người
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBath} /> Tiện nghi phòng tắm:
                            </div>
                            <ul>
                                {room.amenities?.bathroom?.map((item) => (
                                    <li key={`bath-${item.id}`}>{item.name}</li>
                                ))}
                            </ul>
                            <div>
                                <FontAwesomeIcon icon={faMountainCity} /> View phòng:
                            </div>
                            <ul>
                                {room.amenities?.view?.map((item) => (
                                    <li key={`view-${item.id}`}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('price-container')}>
                            <div className={cx('price')}>
                                Giá: <strong>{formatPrice(room.price)}</strong>
                            </div>
                            <div className={cx('status')}>
                                {room.available_rooms > 0 ? `Còn ${room.available_rooms} phòng trống` : 'Hết phòng'}
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default RoomDetail;
