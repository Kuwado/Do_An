import classNames from 'classnames/bind';

import styles from './FullScreen.module.scss';

const cx = classNames.bind(styles);

const FullScreen = ({ children }) => {
    return (
        <div className={cx('full-screen-layout')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default FullScreen;
