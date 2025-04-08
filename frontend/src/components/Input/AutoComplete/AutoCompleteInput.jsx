import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AutoCompleteInput.module.scss';
import { removeTones } from '@/utils/stringUtil';
import Input from '../Default';

const cx = classNames.bind(styles);

const OPTIONS = ['Khách sạn 1', 'Khách sạn 2', 'Khách sạn 3'];

const fn = () => {};

const AutoCompleteInput = ({
    value = '',
    setValue = fn,
    onClick = fn,
    options = OPTIONS,
    label = '',
    type = 'text',
    icon = '',
    id = '',
    width = '100%',
    required = false,
    small = false,
    medium = false,
    large = false,
    autoComplete = 'off',
    className,
    onFocus,
    onBlur,
}) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const filterInput = removeTones(value);
        const filtered = options.filter((option) =>
            removeTones(option.toLowerCase()).includes(filterInput.toLowerCase()),
        );
        setFilteredOptions(filtered);
    }, [value, options]);

    const handleClickOption = (option) => {
        setValue(option);
        onClick(option);
        document.activeElement.blur();
    };
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <div
            className={cx('auto-complete-input', { small, medium, large, [className]: className })}
            style={{ width: width }}
        >
            <div className={cx('input-container')} ref={wrapperRef}>
                <input
                    id={`auto-complete-input-${id}`}
                    type={type}
                    value={value}
                    onChange={handleChangeValue}
                    placeholder=" "
                    autoComplete={autoComplete}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <label htmlFor={`auto-complete-input-${id}`}>
                    {label}
                    {required && <span className={cx('required-note')}>*</span>}
                </label>
                {icon && <div className={cx('icon')}>{icon}</div>}
            </div>

            <div className={cx('options')}>
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt, index) => (
                        <div
                            key={`option-${opt}`}
                            className={cx('option-item')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleClickOption(opt)}
                        >
                            {opt}
                        </div>
                    ))
                ) : (
                    <div className={cx('option-item')}>Không có kết quả phù hợp</div>
                )}
            </div>
        </div>
    );
};

export default AutoCompleteInput;
