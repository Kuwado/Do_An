import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './StaffCreate.module.scss';
import Popup from '../../../../components/Popup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@/components/Button';
import images from '@/assets/images';
import Image from '@/components/Image';
import useProfile from '@/hooks/profile/useProfile';
import { Input, PasswordInput } from '@/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createStaff } from '../../../../services/StaffService';

const cx = classNames.bind(styles);

const StaffCreate = ({ fetchStaffs }) => {
    const { admin } = useProfile();
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState({ first_name: '', last_name: '', username: '', password: '' });

    const setStaffValue = (field, value) => {
        setStaff((prev) => ({ ...prev, [field]: value }));
    };

    console.log(staff);

    const handleAddStaff = async () => {
        if (!staff.username) {
            alert('Vui lòng nhập tên đăng nhập của nhân viên');
        } else if (!staff.password) {
            alert('Vui lòng nhập mật khẩu của nhân viên');
        } else if (!staff.first_name) {
            alert('Vui lòng nhập họ của nhân viên');
        } else if (!staff.last_name) {
            alert('Vui lòng nhập tên của nhân viên');
        }

        const res = await createStaff({
            username: staff.username,
            password: staff.password,
            firstName: staff.first_name,
            lastName: staff.last_name,
            hotelId: admin.hotel_id,
        });

        alert(res.message);
        if (res.success) {
            fetchStaffs();
            setStaff({ first_name: '', last_name: '', username: '', password: '' });
        }
    };

    return (
        <>
            <Button secondary curved leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setShow(true)}>
                Thêm nhân viên
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('staff-create')}>
                    <div className={cx('title')}>Thêm nhân viên mới</div>
                    <Input
                        label="Tên đăng nhập"
                        value={staff.username}
                        setValue={(value) => setStaffValue('username', value)}
                        required
                    />
                    <PasswordInput
                        label="Mật khẩu"
                        password={staff.password}
                        setPassword={(value) => setStaffValue('password', value)}
                        autoComplete="new-password"
                        required
                    />
                    <Input
                        label="Họ"
                        value={staff.first_name}
                        setValue={(value) => setStaffValue('first_name', value)}
                        required
                    />
                    <Input
                        label="Tên"
                        value={staff.last_name}
                        setValue={(value) => setStaffValue('last_name', value)}
                        required
                    />
                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleAddStaff}>
                            Thêm nhân viên
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default StaffCreate;
