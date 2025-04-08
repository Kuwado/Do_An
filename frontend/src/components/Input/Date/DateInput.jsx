import classNames from 'classnames/bind';

import styles from './DateInput.module.scss';

const cx = classNames.bind(styles);

const fn = () => {};

const DateInput = ({
    value,
    setValue,
    label = '',
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
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={cx('date-input', { small, medium, large, [className]: className })} style={{ width: width }}>
            <input
                id={`date-input-${id}`}
                type="date"
                value={value}
                onChange={handleChangeValue}
                placeholder=" "
                autoComplete={autoComplete}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label htmlFor={`date-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
        </div>
    );
};

export default DateInput;
