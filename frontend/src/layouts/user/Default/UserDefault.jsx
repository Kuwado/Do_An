import classNames from 'classnames/bind';

import styles from './UserDefault.module.scss';
import UserHeader from '../components/Header/UserHeader';
import Footer from '../components/Footer/Footer';

const cx = classNames.bind(styles);

const UserDefault = ({ children }) => {
    return (
        <div className={cx('user-default-layout')}>
            <UserHeader />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
};

export default UserDefault;
