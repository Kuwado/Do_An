import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomEdit.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { updateRoom } from '@/services/RoomService';

const cx = classNames.bind(styles);

const RoomEdit = ({ room, fetchRooms }) => {
    const [show, setShow] = useState(false);
    const [roomNumber, setRoomNumber] = useState(room.room_number || '');

    const handleUpdateRoom = async () => {
        if (!roomNumber) {
            alert('Vui lòng nhập số phòng');
        } else {
            const res = await updateRoom(room.id, { room_number: roomNumber });

            alert(res.message);
            if (res.success) {
                fetchRooms();
                setShow(false);
            }
        }
    };

    return (
        <>
            <Button className={cx('edit-btn')} small onClick={() => setShow(true)}>
                <EditIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('room-edit')}>
                    <div className={cx('title')}>Cập nhật phòng</div>
                    <Input label="Số phòng" value={roomNumber} setValue={setRoomNumber} required />
                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleUpdateRoom}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};
export default RoomEdit;
