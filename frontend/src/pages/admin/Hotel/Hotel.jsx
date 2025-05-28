import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Hotel.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import TextArea from '@/components/TextArea';
import Image from '@/components/Image';
import HotelAmenities from './HotelAmenities';
import { getHotel, updateHotel } from '@/services/HotelService';
import { updateHotelAmenities } from '@/services/AmenityService';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const Hotel = () => {
    const { admin } = useProfile();
    const [hotel, setHotel] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [images, setImages] = useState([]);
    const limit = 8;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setHotelValue = (field, value) => {
        setHotel((prev) => ({ ...prev, [field]: value }));
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const total = files.length;

        if (total > limit) {
            alert(`Chỉ được chọn tối đa ${limit} ảnh.`);
            return;
        }

        setImages(files);
    };

    const fetchHotel = async () => {
        setLoading(true);
        const res = await getHotel({ id: admin.hotel_id });
        if (res.success) {
            setHotel(res.hotel);
        }
    };

    useEffect(() => {
        if (admin.hotel_id) fetchHotel();
    }, [admin]);

    useEffect(() => {
        if (avatar) setHotelValue('avatar', avatar);
    }, [avatar]);

    useEffect(() => {
        if (images) setHotelValue('images', images);
    }, [images]);

    const handleUpdateHotel = async () => {
        if (!hotel.name) {
            alert('Vui lòng nhập tên khách sạn');
        } else if (!hotel.phone) {
            alert('Vui lòng nhập số điện thoại');
        } else if (!hotel.email) {
            alert('Vui lòng nhập email');
        } else if (!hotel.city) {
            alert('Vui lòng nhập tỉnh thành');
        } else if (!hotel.address) {
            alert('Vui lòng nhập địa chỉ');
        } else {
            const res = await updateHotel(hotel.id, {
                name: hotel.name,
                phone: hotel.phone,
                email: hotel.email,
                city: hotel.city,
                address: hotel.address,
                description: hotel.description,
                avatar: hotel.avatar,
                images: hotel.images,
            });
            alert(res.message);
            if (res.success) {
                const resA = await updateHotelAmenities({ hotelId: hotel.id, amenityIds: hotel.amenity_ids });
                if (resA.success) {
                    setAvatar(null);
                    setImages([]);
                    fetchHotel();
                }
            }
        }
    };

    return (
        <div className={cx('hotel-management-page')}>
            <div className={cx('hotel-container')}>
                <div className={cx('title', 'title-container')}>
                    <span>Thông tin cơ bản</span>
                    <a className={cx('link-btn')} target="_blank" href={`/hotels/${hotel?.id}`}>
                        <FontAwesomeIcon icon={faLink} />
                    </a>
                </div>
                <Input
                    label="Tên khách sạn"
                    id="name"
                    value={hotel.name || ''}
                    setValue={(value) => setHotelValue('name', value)}
                    required
                />
                <Input
                    label="Số điện thoại"
                    id="phone"
                    type="number"
                    value={hotel.phone || ''}
                    setValue={(value) => setHotelValue('phone', value)}
                    required
                />
                <Input
                    label="Email"
                    id="email"
                    value={hotel.email || ''}
                    setValue={(value) => setHotelValue('email', value)}
                    required
                />
                <Input
                    label="Tỉnh thành"
                    id="city"
                    value={hotel.city || ''}
                    setValue={(value) => setHotelValue('city', value)}
                    required
                />
                <TextArea
                    label="Địa chỉ"
                    id="address"
                    className={cx('address')}
                    value={hotel.address || ''}
                    setValue={(value) => setHotelValue('address', value)}
                    required
                />
                <TextArea
                    label="Mô tả khách sạn"
                    id="description"
                    className={cx('description')}
                    value={hotel.description || ''}
                    setValue={(value) => setHotelValue('description', value)}
                />
            </div>

            <div className={cx('center-container')}>
                <div className={cx('hotel-container')}>
                    <div className={cx('title')}>Ảnh đại diện</div>

                    <div className={cx('upload-avatar')}>
                        <label htmlFor="upload-avatar">
                            {hotel.avatar ? (
                                <Image
                                    id={cx('avatar')}
                                    src={
                                        hotel.avatar instanceof File
                                            ? URL.createObjectURL(hotel.avatar)
                                            : `${IMAGE_URL}${hotel.avatar}`
                                    }
                                    alt="avatar"
                                />
                            ) : (
                                <div className={cx('upload-container')}>
                                    <FontAwesomeIcon icon={faUpload} />
                                    <div>Tải ảnh đại diện khách sạn</div>
                                </div>
                            )}
                        </label>
                        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} id="upload-avatar" />
                    </div>
                </div>

                <div className={cx('hotel-container')}>
                    <div className={cx('title', 'title-images')}>
                        <span>Ảnh về khách sạn</span>
                        <label htmlFor="upload-images">
                            <FontAwesomeIcon icon={faUpload} />
                        </label>
                        <input type="file" multiple onChange={handleImagesChange} id="upload-images" />
                    </div>
                    <div className={cx('upload-images')}>
                        {hotel.images ? (
                            <div className={cx('hotel-images')}>
                                {hotel.images.map((item, index) => (
                                    <Image
                                        key={`Slide-${index}`}
                                        className={cx('image-item')}
                                        src={item instanceof File ? URL.createObjectURL(item) : `${IMAGE_URL}${item}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={cx('upload-container')}>
                                <div>Chưa có ảnh để hiển thị</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('hotel-container')}>
                    <Button secondary onClick={handleUpdateHotel}>
                        Cập nhật
                    </Button>
                </div>
            </div>

            <div className={cx('hotel-container', 'amenities')}>
                <div className={cx('title')}>Tiện nghi khách sạn</div>

                <HotelAmenities
                    amenityIds={hotel.amenity_ids}
                    setAmenityIds={(value) => setHotelValue('amenity_ids', value)}
                />
            </div>
        </div>
    );
};

export default Hotel;
