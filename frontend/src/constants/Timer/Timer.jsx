import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Timer.module.scss';
import { formatTimeMinute } from '@/utils/dateUtil';
import { formatTimeSecond } from '../../utils/dateUtil';

const cx = classNames.bind(styles);

const fn = () => {};

const COUNTDOWN_MINUTES = 30;

const Timer = ({ start, countDownTime = COUNTDOWN_MINUTES, onClear = fn }) => {
    const [countdown, setCountdown] = useState(null);

    const startCountdown = (startTime) => {
        const expireAt = new Date(startTime).getTime() + countDownTime * 60 * 1000;
        const now = new Date().getTime();
        const diff = Math.floor((expireAt - now) / 1000);
        if (diff > 0) {
            setCountdown(diff);
        } else {
            setCountdown(0);
            onClear();
        }
    };

    useEffect(() => {
        if (start) {
            const createdAt = new Date(start);
            startCountdown(createdAt);
        }
    }, [start]);

    useEffect(() => {
        if (countdown === null) return;
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onClear();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div className={cx('timer')}>
            <div>{formatTimeMinute(countdown)}</div>
            <div>{formatTimeSecond(countdown)}</div>
        </div>
    );
};

export default Timer;
