import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '@/components/Image';
import { Button, IconButton } from '@/components/Button';
import { Input } from '@/components/Input';
import images from '@/assets/images';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import TextArea from '@/components/TextArea';
import Starfall from '@/constants/Animations/Starfall/Starfall';
import { updateStaff } from '@/services/StaffService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
    const { admin, fetchAdmin } = useProfile();
    const [currentAdmin, setCurrentAdmin] = useState({});
    const [avatar, setAvatar] = useState(null);

    const setAdminValue = (field, value) => {
        setCurrentAdmin((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setCurrentAdmin(admin);
    }, [admin]);

    useEffect(() => {
        if (avatar) setAdminValue('avatar', avatar);
    }, [avatar]);

    const handleUpdateUser = async () => {
        if (!currentUser.first_name) {
            toast.warning('Vui lòng nhập họ');
        } else if (!currentUser.last_name) {
            toast.warning('Vui lòng nhập tên');
        } else if (!currentUser.phone) {
            toast.warning('Vui lòng nhập số điện thoại');
        } else {
            const res = await updateStaff(admin.id, currentAdmin);
            if (res.success) {
                toast.success(res.message);
                setAvatar(null);
                fetchAdmin();
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('profile-page')}>
            <div className={cx('image-content')}>
                <Image className={cx('background')} src={images.profileBackground} alt="bg" />

                <div className={cx('background-bottom')}>
                    <Starfall />

                    {currentAdmin && (
                        <div className={cx('username-container')}>
                            <div className={cx('username')}>{currentAdmin.username}</div>
                            <div className={cx('role', `${admin.role}`)}>
                                {admin.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                            </div>
                        </div>
                    )}

                    <div className={cx('avatar')}>
                        {currentAdmin.avatar ? (
                            <Image
                                id={cx('profile-avatar')}
                                src={
                                    currentAdmin.avatar instanceof File
                                        ? URL.createObjectURL(currentAdmin.avatar)
                                        : `${IMAGE_URL}${currentAdmin.avatar}`
                                }
                                alt="avatar"
                                circle
                            />
                        ) : (
                            <Image id={cx('profile-avatar')} src={''} alt="avatar" circle />
                        )}
                        <div className={cx('upload-btn')}>
                            <label htmlFor="upload">
                                <FontAwesomeIcon icon={faCamera} />
                            </label>
                            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} id="upload" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('profile-content')}>
                <Input
                    label="Họ"
                    id="first-name"
                    value={currentAdmin.first_name || ''}
                    setValue={(value) => setAdminValue('first_name', value)}
                    required
                />
                <Input
                    label="Tên"
                    id="last-name"
                    value={currentAdmin.last_name || ''}
                    setValue={(value) => setAdminValue('last_name', value)}
                    required
                />
                <Input
                    label="Số điện thoại"
                    id="phone"
                    type="number"
                    value={currentAdmin.phone || ''}
                    setValue={(value) => setAdminValue('phone', value)}
                    required
                />
                <Input
                    label="Email"
                    id="email"
                    value={currentAdmin.email || ''}
                    setValue={(value) => setAdminValue('email', value)}
                />
                <TextArea
                    label="Địa chỉ"
                    id="address"
                    className={cx('address')}
                    value={currentAdmin.address || ''}
                    setValue={(value) => setAdminValue('address', value)}
                    required
                />
            </div>

            <div className={cx('action-btns')}>
                <Button secondary curved width="200px" onClick={handleUpdateUser}>
                    Cập nhật
                </Button>
            </div>
        </div>
    );
};

export default Profile;
