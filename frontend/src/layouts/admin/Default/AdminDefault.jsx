import classNames from 'classnames/bind';

import styles from './AdminDefault.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header';

const cx = classNames.bind(styles);

const AdminDefault = ({ children }) => {
    return (
        <div className={cx('admin-default-layout')}>
            <Sidebar />
            <div className={cx('body')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default AdminDefault;
