import classNames from 'classnames/bind';

import styles from './RoomTypeDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useProfile from '@/hooks/profile/useProfile';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, QuantityInput } from '@/components/Input';
import TextArea from '@/components/TextArea/TextArea';
import UploadImages from '@/constants/UploadImages';
import { createRoomType } from '@/services/RoomService';
import { getAmenitiesByHotelId, updateRoomTypeAmenities } from '@/services/AmenityService';
import { useEffect, useState } from 'react';
import { updateRoomType } from '../../../../services/RoomService';

const cx = classNames.bind(styles);

const RoomTypeDetail = ({ roomType, setRoomTypeValue, fetchRoomType }) => {
    const { admin } = useProfile();
    const [amenities, setAmenities] = useState([]);

    console.log(roomType);

    const fetchAmenities = async () => {
        if (admin.hotel_id) {
            const res = await getAmenitiesByHotelId({ hotelId: admin.hotel_id });
            if (res.success) {
                setAmenities(res.amenities);
            }
        }
    };

    useEffect(() => {
        fetchAmenities();
    }, [admin.hotel_id]);

    const handleReset = () => {
        const cf = confirm('Bạn có muốn cài lại nội dung đã sửa đổi không?');
        if (cf) fetchRoomType();
    };

    const handleUpdateRoomType = async () => {
        if (!roomType.name) {
            alert('Vui lòng nhập tên phòng');
        } else if (!roomType.price) {
            alert('Vui lòng nhập giá phòng');
        } else if (!roomType.capacity) {
            alert('Vui lòng nhập sức chứa');
        } else if (!roomType.area) {
            alert('Vui lòng nhập diện tích phòng');
        } else {
            const res = await updateRoomType(roomType.id, {
                name: roomType.name,
                description: roomType.description,
                price: roomType.price,
                capacity: roomType.capacity,
                area: roomType.area,
                images: roomType.images,
            });

            alert(res.message);
            if (res.success) {
                if (roomType.amenity_ids.length > 0) {
                    const aRes = await updateRoomTypeAmenities({
                        roomTypeId: res.room_type.id,
                        amenityIds: roomType.amenity_ids,
                    });
                    if (!aRes.success) {
                        alert(aRes.message);
                    }
                }
                fetchRoomType();
            }
        }
    };

    return (
        <div className={cx('room-type-detail')}>
            <div className={cx('content')}>
                <div className={cx('content-container')}>
                    <Input
                        label="Tên loại phòng"
                        id="rt-name"
                        value={roomType.name}
                        setValue={(value) => setRoomTypeValue('name', value)}
                        required
                    />
                    <Input
                        label="Diện tích"
                        id="rt-area"
                        type="number"
                        value={roomType.area}
                        setValue={(value) => setRoomTypeValue('area', value)}
                        required
                    />
                    <QuantityInput
                        label="Số lượng khách"
                        id="rt-capacity"
                        value={roomType.capacity}
                        setValue={(value) => setRoomTypeValue('capacity', value)}
                        required
                    />
                    <Input
                        label="Giá tiền/đêm"
                        id="rt-price"
                        type="number"
                        value={roomType.price}
                        setValue={(value) => setRoomTypeValue('price', value)}
                        required
                    />
                    <TextArea
                        label="Mô tả về phòng"
                        id="rt-des"
                        value={roomType.description}
                        setValue={(value) => setRoomTypeValue('description', value)}
                        required
                    />
                </div>

                <div className={cx('content-container')}>
                    <div className={cx('amenity-container')}>
                        <div className={cx('amenity-title')}>View phòng</div>
                        {amenities.view && amenities.view.length > 0 && (
                            <div className={cx('amnity-list')}>
                                {amenities.view.map((a) => (
                                    <label key={a.id} className={cx('checkbox-item')}>
                                        <input
                                            type="checkbox"
                                            value={a.id}
                                            checked={roomType.amenity_ids?.includes(a.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setRoomTypeValue('amenity_ids', [...roomType.amenity_ids, a.id]);
                                                } else {
                                                    setRoomTypeValue(
                                                        'amenity_ids',
                                                        roomType.amenity_ids.filter((id) => id !== a.id),
                                                    );
                                                }
                                            }}
                                        />
                                        {a.name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={cx('amenity-container')}>
                        <div className={cx('amenity-title')}>Phòng tắm</div>
                        {amenities.bathroom && amenities.bathroom.length > 0 && (
                            <div className={cx('amnity-list')}>
                                {amenities.bathroom.map((a) => (
                                    <label key={a.id} className={cx('checkbox-item')}>
                                        <input
                                            type="checkbox"
                                            value={a.id}
                                            checked={roomType.amenity_ids?.includes(a.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setRoomTypeValue('amenity_ids', [...roomType.amenity_ids, a.id]);
                                                } else {
                                                    setRoomTypeValue(
                                                        'amenity_ids',
                                                        roomType.amenity_ids.filter((id) => id !== a.id),
                                                    );
                                                }
                                            }}
                                        />
                                        {a.name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('upload-container')}>
                <UploadImages images={roomType.images || []} setImages={(value) => setRoomTypeValue('images', value)} />
            </div>

            <div className={cx('update-btn-container')}>
                <Button primaryBorder curved width="120px" onClick={handleReset}>
                    Cài lại
                </Button>

                <Button secondary curved width="120px" onClick={handleUpdateRoomType}>
                    Cập nhật
                </Button>
            </div>
        </div>
    );
};

export default RoomTypeDetail;
