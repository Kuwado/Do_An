import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const Dropdown = ({
    title = 'Title',
    label = 'Label',
    id = 'id',
    selected,
    required,
    className,
    left = false,
    right = true,
    width = '',
    children,
}) => {
    const [show, setShow] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className={cx('dropdown', { active: show, [className]: className, left, right })}
            ref={dropRef}
            onClick={() => setShow((prev) => !prev)}
        >
            {label && (
                <div className={cx('label')}>
                    {label}
                    {required && <span className={cx('required-note')}>*</span>}
                </div>
            )}
            <div className={cx('dropdown-container')} style={{ width }}>
                <div className={cx('selected')}>{selected ? selected : title}</div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </div>
                {show && children && <div className={cx('options')}>{children}</div>}
            </div>
        </div>
    );
};

export default Dropdown;
