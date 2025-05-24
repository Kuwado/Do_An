import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomCreate.module.scss';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createRoom } from '@/services/RoomService';

const cx = classNames.bind(styles);

const RoomCreate = ({ fetchRooms, roomTypeId }) => {
    const [show, setShow] = useState(false);
    const [roomNumber, setRoomNumber] = useState('');

    const handleAddRoom = async () => {
        if (!roomNumber) {
            alert('Vui lòng nhập số phòng');
        } else {
            console.log(roomTypeId);
            const res = await createRoom({ roomNumber, roomTypeId });
            console.log(res);

            alert(res.message);
            if (res.success) {
                fetchRooms();
                setRoomNumber('');
            }
        }
    };

    return (
        <>
            <Button secondary curved leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setShow(true)}>
                Thêm phòng mới
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('room-create')}>
                    <div className={cx('title')}> Thêm phòng mới</div>
                    <Input label="Số phòng" value={roomNumber} setValue={setRoomNumber} required />
                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleAddRoom}>
                            Thêm phòng
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default RoomCreate;
