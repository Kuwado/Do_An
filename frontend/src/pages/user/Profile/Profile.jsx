import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Image from '@/components/Image';
import { Button, IconButton } from '@/components/Button';
import { Input } from '@/components/Input';
import { updateUser } from '@/services/UserService';
import Starfall from '@/constants/Animations/Starfall/Starfall';
import images from '@/assets/images';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
    const { user, fetchUser } = useProfile();
    const [currentUser, setCurrentUser] = useState({});
    const [avatar, setAvatar] = useState(null);

    const setUserValue = (field, value) => {
        setCurrentUser((prev) => ({ ...prev, [field]: value }));
    };

    console.log(avatar ? URL.createObjectURL(avatar) : `${IMAGE_URL}${user.avatar}`);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    useEffect(() => {
        if (avatar) setUserValue('avatar', avatar);
    }, [avatar]);

    const handleUpdateUser = async () => {
        const res = await updateUser(user.id, currentUser);
        console.log(res);
        alert(res.message);
        if (res.success) {
            setAvatar(null);
            fetchUser();
        }
    };

    return (
        <div className={cx('profile-page')}>
            <div className={cx('image-content')}>
                <Image className={cx('background')} src={images.profileBackground} alt="bg" />

                <div className={cx('background-bottom')}>
                    <Starfall />

                    {currentUser && <div className={cx('username')}>{currentUser.username}</div>}

                    <div className={cx('avatar')}>
                        {currentUser.avatar ? (
                            <Image
                                id={cx('profile-avatar')}
                                src={
                                    currentUser.avatar instanceof File
                                        ? URL.createObjectURL(currentUser.avatar)
                                        : `${IMAGE_URL}${currentUser.avatar}`
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
                    value={currentUser.first_name || ''}
                    setValue={(value) => setUserValue('first_name', value)}
                    required
                />
                <Input
                    label="Tên"
                    id="last-name"
                    value={currentUser.last_name || ''}
                    setValue={(value) => setUserValue('last_name', value)}
                    required
                />
                <Input
                    label="Số điện thoại"
                    id="phone"
                    type="number"
                    value={currentUser.phone || ''}
                    setValue={(value) => setUserValue('phone', value)}
                    required
                />
                <Input
                    label="Email"
                    id="email"
                    value={currentUser.email || ''}
                    setValue={(value) => setUserValue('email', value)}
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
