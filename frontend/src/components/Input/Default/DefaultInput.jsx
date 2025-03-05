import classNames from 'classnames/bind';

import styles from './DefaultInput.module.scss';

const cx = classNames.bind(styles);

const DefaultInput = ({
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
}) => {
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={cx('default-input', { small, medium, large })} style={{ width: width }}>
            <input id={`default-input-${id}`} type={type} value={value} onChange={handleChangeValue} placeholder=" " />
            <label htmlFor={`default-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
            {icon && <div className={cx('icon')}>{icon}</div>}
        </div>
    );
};

export default DefaultInput;
