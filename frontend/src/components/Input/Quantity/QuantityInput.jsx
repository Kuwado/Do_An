import classNames from 'classnames/bind';

import styles from './QuantityInput.module.scss';
import { useEffect, useRef, useState } from 'react';
import IconButton from '../../Button/IconButton/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const QuantityInput = ({
    value,
    setValue,
    label = '',
    unit = '',
    icon = '',
    id = '',
    width = '100%',
    required = false,
    small = false,
    medium = false,
    large = false,
    className,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [show, setShow] = useState(false);
    const inputRef = useRef(null);

    const handleClick = () => {
        if (!value) {
            setValue(1);
        }
    };

    useEffect(() => {
        if (value == 0) {
            setInputValue('');
        } else {
            setInputValue(`${value} ${unit}`);
        }
    }, [value]);

    const handleMore = () => {
        if (value < 5) {
            setValue(value + 1);
        }
    };

    const handleLess = () => {
        if (value > 1) {
            setValue(value - 1);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
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
            className={cx('quantity-input', { small, medium, large, [className]: className })}
            style={{ width: width }}
            onClick={() => setShow(true)}
            ref={inputRef}
        >
            <div className={cx('input-container')}>
                <input
                    id={`quantity-input-${id}`}
                    type="text"
                    value={inputValue}
                    onClick={handleClick}
                    placeholder=" "
                    readOnly
                />
                <label htmlFor={`quantity-input-${id}`}>
                    {label}
                    {required && <span className={cx('required-note')}>*</span>}
                </label>
                {icon && <div className={cx('icon')}>{icon}</div>}
            </div>

            {show && (
                <div className={cx('actions-btn')}>
                    <IconButton secondary large onClick={handleLess}>
                        <FontAwesomeIcon icon={faMinus} />
                    </IconButton>
                    <input type="number" value={value ?? 0} onChange={(e) => setValue(Number(e.target.value))} />
                    <IconButton secondary large onClick={handleMore}>
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default QuantityInput;
