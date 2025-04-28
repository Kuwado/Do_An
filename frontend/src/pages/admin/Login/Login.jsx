import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import styles from './Login.module.scss';
import { Input, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import images from '@/assets/images';
import { loginAdminFirstStep } from '@/services/AuthService';
import useProfile from '@/hooks/profile/useProfile';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError, admin, setAdmin, loginAdmin, logout } = useProfile();

    useEffect(() => {
        logout();
    }, []);

    const handleNextStep = async () => {
        const res = await loginAdminFirstStep(username);
        if (res.success) {
            setAdmin(res.data.admin);
            navigate(config.routes.admin.login2);
            setError('');
            setStep('second');
        } else {
            setError(res.message);
        }
    };

    const handlePrevStep = async () => {
        navigate(config.routes.admin.login);
        setError('');
        setStep('first');
    };

    return (
        <div className={cx('admin-login-page')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('logo-container')}>
                        <div className={cx('logo')}>KH</div>
                        <div className={cx('logo-name')}>KuwaHotels</div>
                    </div>

                    <h1>Đăng nhập</h1>

                    <h3>Chào mừng bạn đến với hệ thống quản trị của KuwaHotels</h3>
                </div>

                <div className={cx('bottom')}>
                    <div className={cx('bottom-content', { next: step == 'second', prev: step == 'first' })}>
                        <div className={cx('first-step')}>
                            <Input
                                value={username}
                                setValue={setUsername}
                                label="Tài khoản"
                                type="email"
                                icon={<FontAwesomeIcon icon={faKey} />}
                                required
                            />

                            {error && <div className={cx('error')}>{error}</div>}

                            <Button secondary curved onClick={handleNextStep}>
                                Tiếp theo
                            </Button>
                        </div>
                        <div className={cx('second-step')}>
                            <div className={cx('info')}>
                                <img src={admin.avatar ? admin.avatar : images.avatar} alt="avatar" />
                                <div className={cx('full-name')}>
                                    {admin.first_name} {admin.last_name}
                                </div>
                                <div className={cx('username')}>{admin.username}</div>
                                <div className={cx('role')}>
                                    {admin.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                                </div>
                            </div>

                            <PasswordInput password={password} setPassword={setPassword} required />

                            {error && <div className={cx('error')}>{error}</div>}

                            <div className={cx('action-btns')}>
                                <Button primary transparent curved onClick={handlePrevStep}>
                                    Quay lại
                                </Button>
                                <Button secondary curved onClick={() => loginAdmin(username, password)}>
                                    Tiếp theo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
