import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import { AutoCompleteInput, DateInput, Input, QuantityInput } from '@/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useHotels } from '@/hooks/hotels';
import { useSearchForm } from '@/hooks/search';
import { Button } from '@/components/Button';
import config from '@/config';
import { getDate } from '@/utils/dateUtil';

const cx = classNames.bind(styles);

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentParams = new URLSearchParams(location.search);
    const { search, setSearchField } = useSearchForm({
        city: currentParams.get('city') || '',
        check_in: currentParams.get('checkIn') || getDate(0),
        check_out: currentParams.get('checkOut') || getDate(1),
        quantity: currentParams.get('quantity') || 0,
        people: currentParams.get('people') || 0,
    });
    const { cities } = useHotels();

    const handleSearch = () => {
        if (search.city) {
            currentParams.set('city', search.city);
        } else {
            currentParams.delete('city');
        }
        if (search.check_in) currentParams.set('checkIn', search.check_in);
        if (search.check_out) currentParams.set('checkOut', search.check_out);
        if (search.quantity) currentParams.set('quantity', search.quantity);
        if (search.people) currentParams.set('people', search.people);

        navigate(`${config.routes.user.hotels}?${currentParams.toString()}`);
    };

    useEffect(() => {
        if (location.pathname === config.routes.user.hotels) {
            if (search.check_in && !currentParams.get('checkIn')) currentParams.append('checkIn', search.check_in);
            if (search.check_out && !currentParams.get('checkOut')) currentParams.append('checkOut', search.check_out);
            navigate(`${config.routes.user.hotels}?${currentParams.toString()}`, { replace: true });
        }
    }, [location.pathname]);

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

            <div className={cx('btn-container')}>
                <Button secondary curved leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
