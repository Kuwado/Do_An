import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import classNames from 'classnames/bind';
import styles from './Starfall.module.scss';

const cx = classNames.bind(styles);

const generateStar = () => ({
    id: Math.random().toString(36).substr(2, 9),
    left: Math.random() * 100,
    delay: Math.random() * 5,
    size: 12 + Math.random() * 20,
});

const Starfall = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStars((prev) => [...prev, generateStar()].slice(-80));
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cx('container')}>
            {stars.map((star) => (
                <StarIcon
                    key={star.id}
                    className={cx('starfall')}
                    style={{
                        left: `${star.left}%`,
                        animationDelay: `${star.delay}s`,
                        fontSize: `${star.size}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default Starfall;
