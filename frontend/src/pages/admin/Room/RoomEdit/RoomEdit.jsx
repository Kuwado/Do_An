import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomEdit.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { updateRoom } from '@/services/RoomService';
import Dropdown from '@/components/Dropdown';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const STATUS = {
    active: 'Hoạt động',
    maintenance: 'Bảo trì',
};

const RoomEdit = ({ room, fetchRooms }) => {
    const [show, setShow] = useState(false);
    const [roomNumber, setRoomNumber] = useState(room.room_number || '');
    const [status, setStatus] = useState(room.status || 'active');

    const handleUpdateRoom = async () => {
        if (!roomNumber) {
            toast.warning('Vui lòng nhập số phòng');
        } else {
            const res = await updateRoom(room.id, { room_number: roomNumber, status });

            if (res.success) {
                toast.success(res.message);
                fetchRooms();
                setShow(false);
            } else {
                toast.error(res.message);
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
                    <Dropdown
                        className={cx('category')}
                        label="Trạng thái"
                        selected={STATUS[status]}
                        width="100%"
                        outline
                    >
                        <div onClick={() => setStatus('active')}>{STATUS['active']}</div>
                        <div onClick={() => setStatus('maintenance')}>{STATUS['maintenance']}</div>
                    </Dropdown>
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
