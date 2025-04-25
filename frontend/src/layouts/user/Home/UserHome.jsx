import classNames from 'classnames/bind';

import styles from './UserHome.module.scss';
import UserHeader from '../components/Header/UserHeader';
import Footer from '../components/Footer/Footer';

const cx = classNames.bind(styles);

const UserHome = ({ children }) => {
    return (
        <div className={cx('user-home-layout')}>
            <UserHeader />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
};

export default UserHome;
