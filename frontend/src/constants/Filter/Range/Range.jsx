import classNames from 'classnames/bind';

import styles from './Range.module.scss';
import { Button } from '../../../components/Button';
import { Range } from 'react-range';
import { useState } from 'react';

const cx = classNames.bind(styles);

const fn = () => {};

const MIN = 0;
const MAX = 10000000;

const PriceRangeSlider = ({
    values,
    setValues,
    minValue = MIN,
    maxValue = MAX,
    title = 'Khoảng giá',
    unit = 'VND',
    onChange = fn,
}) => {
    const formatNumber = (num) => {
        return num.toLocaleString('vi-VN');
    };

    const parseNumber = (str) => {
        return Number(str.replace(/\./g, ''));
    };

    const handleInputChange = (index, newValue) => {
        const updated = [...values];
        updated[index] = Number(newValue);
        // đảm bảo min không vượt max và ngược lại
        if (index === 0 && updated[0] >= updated[1]) updated[0] = updated[1] - 100000;
        if (index === 1 && updated[1] <= updated[0]) updated[1] = updated[0] + 100000;
        // giới hạn trong khoảng
        updated[0] = Math.max(minValue, Math.min(updated[0], maxValue));
        updated[1] = Math.max(minValue, Math.min(updated[1], maxValue));
        setValues(updated);
    };

    return (
        <div className={cx('price-range-slider')}>
            <div className={cx('header')}>
                <span>{title}</span>
                <button onClick={() => setValues([minValue, maxValue])}>Đặt lại</button>
            </div>

            <Range
                step={100000}
                min={minValue}
                max={maxValue}
                values={values}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children, index }) => (
                    <div
                        {...props}
                        key={`track-${index}`}
                        className={cx('track')}
                        style={{
                            ...props.style,
                            height: '6px',
                            background: `linear-gradient(to right, #ccc ${
                                ((values[0] - minValue) / (maxValue - minValue)) * 100
                            }%, var(--secondary) ${
                                ((values[0] - minValue) / (maxValue - minValue)) * 100
                            }% , var(--secondary) ${((values[1] - minValue) / (maxValue - minValue)) * 100}%, #ccc ${
                                ((values[1] - minValue) / (maxValue - minValue)) * 100
                            }%)`,
                            borderRadius: '3px',
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props, index }) => (
                    <div
                        {...props}
                        key={`thumb-${index}`}
                        style={{
                            ...props.style,
                            height: '24px',
                            width: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            border: '2px solid var(--secondary)',
                            boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
                        }}
                    />
                )}
            />

            <div className={cx('price-values')}>
                <div className={cx('price-value')}>
                    <div>{unit}</div>
                    <input
                        type="text"
                        value={formatNumber(values[0])}
                        onChange={(e) => handleInputChange(0, parseNumber(e.target.value))}
                    />
                </div>
                <div className={cx('price-value')}>
                    <div>{unit}</div>
                    <input
                        type="text"
                        value={formatNumber(values[1])}
                        onChange={(e) => handleInputChange(1, parseNumber(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceRangeSlider;
