import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPhone, faSignature } from '@fortawesome/free-solid-svg-icons';

import styles from './Register.module.scss';
import images from '@/assets/images';
import config from '@/config';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import useProfile from '@/hooks/profile/useProfile';
import { createUser } from '../../../services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const { error, setError, loginUser, logout } = useProfile();

    useEffect(() => {
        logout();
    }, []);

    const handleRegister = async () => {
        if (!username) {
            toast.warning('Vui lòng nhập tên đăng nhập');
        } else if (!password) {
            toast.warning('Vui lòng nhập mật khẩu');
        } else if (!firstName) {
            toast.warning('Vui lòng nhập họ');
        } else if (!lastName) {
            toast.warning('Vui lòng nhập tên');
        } else if (!phone) {
            toast.warning('Vui lòng nhập số điện thoại');
        } else {
            const res = await createUser({ username, password, firstName, lastName, phone });
            if (res.success) {
                toast.success(res.message);
                loginUser(username, password);
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('register-page')}>
            <div className={cx('register-content')}>
                <div className={cx('content-left')}>
                    <img src={images.loginPoster} alt="register-poster" />
                </div>
                <div className={cx('content-right')}>
                    <h1 className={cx('title')}>Đăng ký</h1>
                    <div className={cx('register-form')}>
                        <Input
                            id="username"
                            value={username}
                            setValue={setUsername}
                            label="Tài khoản"
                            icon={<FontAwesomeIcon icon={faKey} />}
                            required
                        />

                        <PasswordInput id="pass" password={password} setPassword={setPassword} required />

                        {error && <div className={cx('error')}>{error}</div>}

                        <Input
                            id="fn"
                            value={firstName}
                            setValue={setFirstName}
                            label="Họ"
                            icon={<FontAwesomeIcon icon={faSignature} />}
                            required
                        />

                        <Input
                            id="ln"
                            value={lastName}
                            setValue={setLastName}
                            label="Tên"
                            icon={<FontAwesomeIcon icon={faSignature} />}
                            required
                        />

                        <Input
                            id="phone"
                            value={phone}
                            setValue={setPhone}
                            type="number"
                            label="Số điện thoại"
                            icon={<FontAwesomeIcon icon={faPhone} />}
                            required
                        />

                        <Button className={cx('register-btn')} secondary curved width="100%" onClick={handleRegister}>
                            Đăng ký
                        </Button>

                        <div className={cx('line')}>
                            <span>Bạn đã có tài khoản?</span>
                        </div>

                        <Button primaryBorder curved width="100%" to={config.routes.user.login}>
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
