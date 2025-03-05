import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserHeader.module.scss';

const cx = classNames.bind(styles);

const UserHeader = () => {
    return <div className={cx('user-header')}>UserHeader</div>;
};

export default UserHeader;
