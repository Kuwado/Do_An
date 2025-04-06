import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import config from '@/config';

const cx = classNames.bind(styles);

const StaffFunction = () => {
    return (
        <>
            <Link
                className={cx('sidebar-item', { active: location.pathname == config.routes.admin.dashboard })}
                to={config.routes.admin.dashboard}
            >
                <div className={cx('sidebar-icon')}>
                    <FontAwesomeIcon icon={faHome} />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </Link>
            <Link className={cx('sidebar-item')} to={config.routes.staff.dashboard}>
                <div className={cx('sidebar-icon')}>
                    <FontAwesomeIcon icon={faHome} />
                </div>
                <div className={cx('sidebar-title')}>Trang chủ</div>
            </Link>
        </>
    );
};

export default StaffFunction;
