import classNames from 'classnames/bind';

import styles from './Overview.module.scss';
import images from '@/assets/images';
import Image from '@/components/Image';
import { Button } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faEnvelope, faImages, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import Rating from '@/constants/Rating';
import background from '@/assets/background';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const Overview = ({ hotel = {}, forwardedRef }) => {
    const [showReadMore, setShowReadMore] = useState(false);
    const descriptionRef = useRef(null);
    const galleryImages = hotel.images?.length > 0 ? hotel.images.slice(1, 5) : [];

    while (galleryImages.length < 4) {
        galleryImages.push(images.hotel);
    }

    useEffect(() => {
        const desc = descriptionRef.current;
        if (desc) {
            if (desc.scrollHeight > desc.offsetHeight) {
                setShowReadMore(true);
            }
        }
    }, [hotel.description]);

    return (
        <div ref={forwardedRef} className={cx('hotel-overview')}>
            <div className={cx('hotel-overview-header')}>
                <div className={cx('hotel-info-container')}>
                    <div className={cx('hotel-name')}>
                        {hotel.name}
                        {hotel.available_rooms === 0 && <div className={cx('out-of-rooms')}>Hết phòng</div>}
                    </div>
                    <div className={cx('hotel-count')}>
                        Có {hotel.total_room_types} loại phòng, {hotel.total_rooms} phòng và {hotel.total_services} dịch
                        vụ
                    </div>
                </div>

                <div className={cx('rating-container')}>
                    <div className={cx('rating-count')}>
                        <div className={cx('count')}>{hotel.rating}/5</div>
                        <Rating rate={hotel.rating} />
                    </div>
                    <div className={cx('review-count')}>
                        <div className={cx('count')}>{hotel.total_reviews}</div>
                        <span>Lượt đánh giá</span>
                    </div>
                </div>
            </div>

            <div className={cx('gallery')}>
                <div className={cx('gallery-left')}>
                    <Image src={galleryImages[0]} />
                </div>
                <div className={cx('gallery-right')}>
                    {galleryImages.map((img, index) => (
                        <Image key={`gallert-image-${index}`} src={img} alt={`Small ${index}`} />
                    ))}
                    {hotel.images && hotel.images.length > 5 && (
                        <Button
                            className={cx('show-all-btn')}
                            leftIcon={<FontAwesomeIcon icon={faImages} />}
                            small
                            primaryBorder
                        >
                            Hiển thị tất cả ảnh
                        </Button>
                    )}
                </div>
            </div>

            <div className={cx('information')}>
                <div className={cx('overview')}>
                    <div className={cx('information-overview', 'overview-item')}>
                        <div className={cx('title')}>Thông tin cơ bản</div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div>{hotel.address}</div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div>{hotel.email}</div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div>{hotel.phone}</div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faDoorOpen} />
                            </div>
                            <div>{hotel.available_rooms} phòng trống</div>
                        </div>
                    </div>

                    <div className={cx('amenity-overview', 'overview-item')}>
                        <div className={cx('title')}>Các tiện nghi</div>
                        <div className={cx('item-list')}>
                            {hotel.amenities?.general &&
                                hotel.amenities.general.map((amt) => (
                                    <div key={`amenity-${amt.id}`} className={cx('item')}>
                                        <div>{amt.name}</div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className={cx('service-overview', 'overview-item')}>
                        <div className={cx('title')}>Các dịch vụ</div>
                        <div className={cx('item-list')}>
                            {hotel.services &&
                                Object.values(hotel.services)
                                    .flat()
                                    .map((sv) => (
                                        <div key={`service-${sv.id}`} className={cx('item')}>
                                            <div>{sv.name}</div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>

                <div className={cx('description')}>
                    <div
                        ref={descriptionRef}
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {hotel.description}
                    </div>
                    {showReadMore && <button className={cx('read-more-btn')}>Đọc thêm</button>}
                </div>
            </div>
        </div>
    );
};

export default Overview;
