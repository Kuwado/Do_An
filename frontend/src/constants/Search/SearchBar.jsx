import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import { AutoCompleteInput, DateInput, Input, QuantityInput } from '../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useHotels } from '@/hooks/hotels';
import { useSearchForm } from '@/hooks/search';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchBar = () => {
    const navigate = useNavigate();
    const { search, setSearchField } = useSearchForm();
    const { cities } = useHotels();

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (search.city) params.append('city', search.city);
        if (search.check_in) params.append('check_in', search.check_in);
        if (search.check_out) params.append('check_out', search.check_out);
        if (search.quantity) params.append('quantity', search.quantity);
        if (search.people) params.append('people', search.people);

        navigate(`/hotels?${params.toString()}`);
    };

    return (
        <div className={cx('search-bar')}>
            <div className={cx('city')}>
                <AutoCompleteInput
                    id="city-input"
                    value={search.city}
                    setValue={(value) => setSearchField('city', value)}
                    options={cities}
                    label="Nhập nơi bạn muốn đến"
                    icon={<FontAwesomeIcon icon={faLocationDot} />}
                />
            </div>
            <div className={cx('check-in')}>
                <DateInput
                    id="in-input"
                    value={search.check_in}
                    setValue={(value) => setSearchField('check_in', value)}
                    label="Ngày nhận"
                />
            </div>
            <div className={cx('check-out')}>
                <DateInput
                    id="out-input"
                    value={search.check_out}
                    setValue={(value) => setSearchField('check_out', value)}
                    label="Ngày trả"
                />
            </div>
            <div className={cx('quantity')}>
                <QuantityInput
                    id="quantity-input"
                    value={search.quantity}
                    setValue={(value) => setSearchField('quantity', value)}
                    label="Số phòng"
                    unit="Phòng"
                />
            </div>
            <div className={cx('people')}>
                <QuantityInput
                    id="people-input"
                    value={search.people}
                    setValue={(value) => setSearchField('people', value)}
                    label="Số người"
                    unit="Người"
                />
            </div>

            <div className={cx('btn-container')} onClick={handleSearch}>
                <Button secondary curved leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}>
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
