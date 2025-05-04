import classNames from 'classnames/bind';

import styles from './Popup.module.scss';
import { IconButton } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const fn = () => {};

const Popup = ({ show = true, setShow = fn, children }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    return (
        <>
            {show && (
                <div className={cx('popup')}>
                    <IconButton className={cx('close-btn')} onClick={() => setShow(false)} large>
                        <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                    <div className={cx('content')}>{children}</div>
                </div>
            )}
        </>
    );
};

export default Popup;
