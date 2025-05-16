import { useState } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './PasswordInput.module.scss';

const cx = classNames.bind(styles);

const PasswordInput = ({
    password,
    setPassword = () => {},
    width = '100%',
    id = 'id',
    label = 'Mật khẩu',
    required = true,
    small = false,
    medium = false,
    large = false,
    autoComplete = 'off',
}) => {
    const [show, setShow] = useState(false);
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={cx('password-input', { small, medium, large })} style={{ width: width }}>
            <input
                id={`password-input-${id}`}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={handleChangePassword}
                placeholder=" "
                autoComplete={autoComplete}
            />
            <label htmlFor={`password-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
            <button type="button" className={cx('show-btn')} onClick={() => setShow((prev) => !prev)}>
                <FontAwesomeIcon icon={!show ? faEye : faEyeSlash} />
            </button>
        </div>
    );
};

export default PasswordInput;
