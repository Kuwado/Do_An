import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Loading = ({ message = 'Vui lòng chờ', full = false }) => {
    return (
        <div className={cx('loading', { full })}>
            <div className={cx('spinner-container')}>
                <FontAwesomeIcon className={cx('spinner-icon')} icon={faSpinner} />
                <div className={cx('message')}>{message}</div>
            </div>
        </div>
    );
};

export default Loading;
