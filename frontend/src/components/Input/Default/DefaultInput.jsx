import classNames from 'classnames/bind';

import styles from './DefaultInput.module.scss';

const cx = classNames.bind(styles);

const fn = () => {};

const Input = ({
    value,
    setValue,
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
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={cx('default-input', { small, medium, large, [className]: className })} style={{ width: width }}>
            <input
                id={`default-input-${id}`}
                type={type}
                value={value}
                onChange={handleChangeValue}
                placeholder=" "
                autoComplete={autoComplete}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label htmlFor={`default-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
            {icon && <div className={cx('icon')}>{icon}</div>}
        </div>
    );
};

export default Input;
