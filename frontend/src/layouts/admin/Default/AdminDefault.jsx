import classNames from 'classnames/bind';

import styles from './AdminDefault.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

const AdminDefault = ({ children }) => {
    return (
        <div className={cx('admin-default-layout')}>
            <Sidebar />
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default AdminDefault;
