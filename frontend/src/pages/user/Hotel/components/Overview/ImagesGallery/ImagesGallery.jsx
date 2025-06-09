import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ImagesGallery.module.scss';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const ImagesGallery = ({ avatar, images = [] }) => {
    const allImages = [avatar, ...images];
    const [show, setShow] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSelectImage = (index) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Button
                className={cx('show-all-btn')}
                leftIcon={<FontAwesomeIcon icon={faImages} />}
                small
                primaryBorder
                onClick={() => setShow(true)}
            >
                Hiển thị tất cả ảnh
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('images-gallery')}>
                    {/* Ảnh lớn + nút trái/phải */}
                    <div className={cx('main-image-wrapper')}>
                        <button className={cx('nav-btn', 'left')} onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <img
                            src={`${IMAGE_URL}${allImages[currentIndex]}`}
                            alt={`Ảnh ${currentIndex + 1}`}
                            className={cx('main-image')}
                        />
                        <button className={cx('nav-btn', 'right')} onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    {/* Thumbnail */}
                    <div className={cx('thumbnail-list')}>
                        {allImages.map((img, index) => (
                            <img
                                key={index}
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
            </Popup>
        </>
    );
};

export default ImagesGallery;
