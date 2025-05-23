import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomCreate.module.scss';
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

const cx = classNames.bind(styles);

const RoomCreate = ({ fetchRoomTypes }) => {
    const { admin } = useProfile();
    const [show, setShow] = useState(false);
    const [roomType, setRoomType] = useState({
        name: '',
        images: [],
        description: '',
        price: '',
        capacity: '',
        area: '',
    });
    const [amenities, setAmenities] = useState([]);
    const [amenityIds, setAmenityIds] = useState([]);

    const setRoomTypeValue = (field, value) => {
        setRoomType((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddRoomType = async () => {
        if (!roomType.name) {
            alert('Vui lòng nhập tên phòng');
        } else if (!roomType.price) {
            alert('Vui lòng nhập giá phòng');
        } else if (!roomType.capacity) {
            alert('Vui lòng nhập sức chứa');
        } else if (!roomType.area) {
            alert('Vui lòng nhập diện tích phòng');
        } else {
            const res = await createRoomType({
                name: roomType.name,
                description: roomType.description,
                price: roomType.price,
                capacity: roomType.capacity,
                area: roomType.area,
                images: roomType.images,
            });

            alert(res.message);
            if (res.success) {
                if (amenityIds.length > 0) {
                    const aRes = await updateRoomTypeAmenities({ roomTypeId: res.room_type.id, amenityIds });
                    if (!aRes.success) {
                        alert(aRes.message);
                    }
                }
                fetchRoomTypes();
                setRoomType({
                    name: '',
                    images: [],
                    description: '',
                    price: '',
                    capacity: '',
                    area: '',
                });
                setAmenityIds([]);
            }
        }
    };

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

    return (
        <>
            <Button secondary curved leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setShow(true)}>
                Thêm loại phòng mới
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('room-type-create')}>
                    <div className={cx('title')}>Thêm loại phòng mới</div>
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

                            <div className={cx('upload-container')}>
                                <UploadImages
                                    images={roomType.images}
                                    setImages={(value) => setRoomTypeValue('images', value)}
                                    append={true}
                                />
                            </div>
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
                                                    checked={amenityIds.includes(a.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setAmenityIds([...amenityIds, a.id]);
                                                        } else {
                                                            setAmenityIds(amenityIds.filter((id) => id !== a.id));
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
                                                    checked={amenityIds.includes(a.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setAmenityIds([...amenityIds, a.id]);
                                                        } else {
                                                            setAmenityIds(amenityIds.filter((id) => id !== a.id));
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

                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleAddRoomType}>
                            Thêm loại phòng
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default RoomCreate;
