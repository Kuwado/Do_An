import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Image.module.scss';
import images from '@/assets/images';

const cx = classNames.bind(styles);

const Image = forwardRef(
    (
        {
            src,
            alt,
            width = '100%',
            height = ' 100%',
            id = '',
            circle = false,
            className,
            fallback = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [currentFallback, setCurrentFallback] = useState('');

        const handleError = () => {
            setCurrentFallback(fallback);
        };

        return (
            <img
                className={cx('image', { circle }, { [className]: className })}
                id={id}
                ref={ref}
                src={currentFallback || src || fallback}
                alt={alt}
                width={width}
                height={height}
                {...props}
                onError={handleError}
            />
        );
    },
);

export default Image;
