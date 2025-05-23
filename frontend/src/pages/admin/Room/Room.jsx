import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Room.module.scss';
import { IconButton } from '@/components/Button';
import { getRoomType } from '../../../services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import RoomTypeDetail from './RoomTypeDetail/RoomTypeDetail';
import RoomList from './RoomList/RoomList';

const cx = classNames.bind(styles);

const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomType, setRoomType] = useState({
        name: '',
        images: [],
        description: '',
        price: '',
        capacity: '',
        area: '',
        amenity_ids: [],
    });
    const [roomName, setRoomName] = useState('');
    const [section, setSection] = useState('detail'); // rooms

    const setRoomTypeValue = (field, value) => {
        setRoomType((prev) => ({ ...prev, [field]: value }));
    };

    const fetchRoomType = async () => {
        const res = await getRoomType({ id });
        if (res.success) {
            setRoomType(res.room_type);
            setRoomName(res.room_type.name);
        }
    };

    useEffect(() => {
        fetchRoomType();
    }, [id]);

    return (
        <div className={cx('room-type-page')}>
            <div className={cx('room-type-title-container')}>
                <div className={cx('room-type-title')}>{roomName}</div>
                <IconButton className={cx('back-btn')} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </IconButton>
            </div>

            <div className={cx('room-content')}>
                <div className={cx('sections')}>
                    <div
                        className={cx('section-item', { active: section === 'detail' })}
                        onClick={() => setSection('detail')}
                    >
                        Thông tin loại phòng
                    </div>
                    <div
                        className={cx('section-item', { active: section === 'rooms' })}
                        onClick={() => setSection('rooms')}
                    >
                        Danh sách phòng
                    </div>
                </div>

                <div className={cx('content')}>
                    {section === 'detail' && (
                        <RoomTypeDetail
                            roomType={roomType}
                            setRoomTypeValue={setRoomTypeValue}
                            fetchRoomType={fetchRoomType}
                        />
                    )}
                    {section === 'rooms' && <RoomList />}
                </div>
            </div>
        </div>
    );
};

export default Room;
