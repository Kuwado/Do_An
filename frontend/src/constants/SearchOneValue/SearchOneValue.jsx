import classNames from 'classnames/bind';

import styles from './SearchOneValue.module.scss';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const SearchOneValue = ({ id = '', value = '', setValue = fn, label = 'Tìm kiếm', onClick = fn, click = false }) => {
    return (
        <div className={cx('search-one-value', { click })}>
            <Input
                id={id}
                className={cx('search-input')}
                value={value}
                setValue={setValue}
                label={label}
                icon={!click && <FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
            {click && (
                <button className={cx('search-btn')} onClick={onClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            )}
        </div>
    );
};

export default SearchOneValue;
