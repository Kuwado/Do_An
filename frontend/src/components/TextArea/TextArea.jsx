import classNames from 'classnames/bind';

import styles from './TextArea.module.scss';

const cx = classNames.bind(styles);

const TextArea = ({
    value,
    setValue,
    label = '',
    id = '',
    rows = '5',
    width = '100%',
    required = false,
    className,
    onFocus,
    onBlur,
    readOnly = false,
}) => {
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={cx('text-area', { [className]: className })} style={{ width: width }}>
            <textarea
                id={`default-input-${id}`}
                rows={rows}
                value={value}
                onChange={handleChangeValue}
                placeholder=" "
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readOnly}
            />
            <label htmlFor={`default-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
        </div>
    );
};

export default TextArea;
