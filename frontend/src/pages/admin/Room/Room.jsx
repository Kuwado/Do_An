import { useEffect, useState } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Room.module.scss';
import { IconButton } from '@/components/Button';
import { getRoomType } from '../../../services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import RoomTypeDetail from './RoomTypeDetail/RoomTypeDetail';
import RoomList from './RoomList/RoomList';
import config from '@/config';

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
                        className={cx('section-item', { active: useMatch(config.routes.admin.room) })}
                        onClick={() => navigate(`/rooms/${id}`)}
                    >
                        Thông tin loại phòng
                    </div>
                    <div
                        className={cx('section-item', { active: useMatch(config.routes.admin.roomList) })}
                        onClick={() => navigate(`/rooms/${id}/list`)}
                    >
                        Danh sách phòng
                    </div>
                </div>

                <div className={cx('content')}>
                    {useMatch(config.routes.admin.room) && (
                        <RoomTypeDetail
                            roomType={roomType}
                            setRoomTypeValue={setRoomTypeValue}
                            fetchRoomType={fetchRoomType}
                        />
                    )}
                    {useMatch(config.routes.admin.roomList) && <RoomList />}
                </div>
            </div>
        </div>
    );
};

export default Room;
