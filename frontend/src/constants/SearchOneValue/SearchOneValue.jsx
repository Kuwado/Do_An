import classNames from 'classnames/bind';

import styles from './SearchOneValue.module.scss';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const SearchOneValue = ({ id = '', value = '', setValue = fn, label = 'Tìm kiếm' }) => {
    return (
        <div className={cx('search-one-value')}>
            <Input
                id={id}
                className={cx('search-input')}
                value={value}
                setValue={setValue}
                label={label}
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
            {value && (
                <button className={cx('clear-btn')} onClick={() => setValue('')}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            )}
        </div>
    );
};

export default SearchOneValue;
