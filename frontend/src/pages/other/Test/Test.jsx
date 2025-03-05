import { useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Test.module.scss';
import DefaultInput from '@components/Input/Default';
import PasswordInput from '@components/Input/Password';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Test = () => {
    const [value, setValue] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className={cx('test')}>
            <DefaultInput
                value={value}
                setValue={setValue}
                label="Helo"
                id="ne"
                required
                width="500px"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <PasswordInput value={pass} setValue={setPass} label="Helo" id="ne" required width="500px" />
            {/* <EmailInput value={pass} setValue={setPass} label="Helo" id="ne" required width="500px" /> */}
        </div>
    );
};

export default Test;
