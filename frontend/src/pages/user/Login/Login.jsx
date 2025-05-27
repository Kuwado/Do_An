import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import styles from './Login.module.scss';
import images from '@/assets/images';
import config from '@/config';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import useProfile from '@/hooks/profile/useProfile';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError, loginUser, logout } = useProfile();

    useEffect(() => {
        logout();
    }, []);

    return (
        <div className={cx('user-login-page')}>
            <div className={cx('login-content')}>
                <div className={cx('content-left')}>
                    <img src={images.loginPoster} alt="login-poster" />
                </div>
                <div className={cx('content-right')}>
                    <h1 className={cx('title')}>Đăng nhập</h1>
                    <div className={cx('login-form')}>
                        <Input
                            value={username}
                            setValue={setUsername}
                            label="Tài khoản"
                            icon={<FontAwesomeIcon icon={faKey} />}
                            required
                        />

                        <PasswordInput password={password} setPassword={setPassword} required />

                        {error && <div className={cx('error')}>{error}</div>}

                        <Link className={cx('forgot-password-btn')} to={config.routes.user.forgotPassword}>
                            Quên mật khẩu
                        </Link>

                        <Button secondary curved width="100%" onClick={() => loginUser(username, password)}>
                            Đăng nhập
                        </Button>

                        <div className={cx('line')}>
                            <span>Hoặc đăng nhập với</span>
                        </div>

                        <Button secondaryOutline curved width="100%">
                            <div className={cx('google-login-btn-content')}>
                                <img className={cx('logo-google')} src={images.logoGoogle} alt="logo-google" />
                                <span>Đăng nhập với google</span>
                            </div>
                        </Button>

                        <div className={cx('register')}>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link className={cx('register-btn')} to={config.routes.user.register}>
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
