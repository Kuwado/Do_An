import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import SearchBar from '@/constants/Search';
import { HotelItem, HotelCard } from '@/constants/Card';
import { PriceRangeSlider } from '@/constants/Filter';
import Pagination from '@/constants/Pagination';
import { Button } from '@/components/Button';
import SortBy from './components/SortBy';
import AmenityFilter from './components/AmenityFilter';
import DisplaySelction from './components/DisplaySelction';
import { searchHotels } from '@/services/HotelService';

const cx = classNames.bind(styles);

const MIN = 0;
const MAX = 10000000;

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [hotels, setHotels] = useState([]);
    const [totalHotels, setTotalHotels] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [values, setValues] = useState([params.get('from') ?? MIN, params.get('to') ?? MAX]);
    const [amenities, setAmenities] = useState([]);
    const [sortBy, setSortBy] = useState('price-asc');
    const [display, setDisplay] = useState('list');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getQueryParams = () => {
        return {
            city: params.get('city') || '',
            check_in: params.get('check_in') || '',
            check_out: params.get('check_out') || '',
            quantity: params.get('quantity') || '',
            people: params.get('people') || '',
            from: params.get('from') || '',
            to: params.get('to') || '',
            amenities: params.get('amenities') || '',
            page: params.get('page') || 1,
            limit: display === 'list' ? 4 : 9,
            sortBy: params.get('sortBy') || '',
        };
    };

    useEffect(() => {
        const queryParams = getQueryParams();
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const res = await searchHotels({ ...queryParams });
                setHotels(res.hotels);
                setTotalPages(res.totalPages);
                setTotalHotels(res.totalItems);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();

        setValues([params.get('from') ?? MIN, params.get('to') ?? MAX]);
        const rawAmenities = params.get('amenities');
        const amenities = rawAmenities ? rawAmenities.split(',').map(Number) : [];
        setAmenities(amenities);
        setSortBy(params.get('sortBy') ?? 'price-asc');
    }, [location.search, display]);

    const handleFilter = () => {
        if (values[0]) {
            params.set('from', values[0].toString());
        } else {
            params.delete('from');
        }

        if (values[1] && values[1] != MAX) {
            params.set('to', values[1].toString());
        } else {
            params.delete('to');
        }

        if (amenities && amenities.length > 0) {
            params.set('amenities', amenities.map(String).join(','));
        } else {
            params.delete('amenities');
        }

        navigate(`/hotels?${params.toString()}`);
    };

    const clearFilter = () => {
        params.delete('from');
        params.delete('to');
        params.delete('amenities');
        navigate(`/hotels?${params.toString()}`);
    };

    return (
        <div className={cx('hotels-search-page')}>
            <div className={cx('search-container')}>
                <SearchBar />
            </div>

            <div className={cx('hotels-search-content')}>
                <div className={cx('content-left')}>
                    <PriceRangeSlider values={values} setValues={setValues} />

                    <AmenityFilter
                        amenities={amenities}
                        setAmenities={setAmenities}
                        setLoading={setLoading}
                        setError={setError}
                    />

                    <div className={cx('actions')}>
                        <Button primaryBorder transparent onClick={clearFilter}>
                            Bỏ lọc
                        </Button>
                        <Button secondaryBorder onClick={handleFilter}>
                            Lọc
                        </Button>
                    </div>
                </div>

                <div className={cx('content-right')}>
                    <div className={cx('content-right-header')}>
                        <div className={cx('total-hotels')}>
                            {totalHotels > 1 ? `Có ${totalHotels} khách sạn` : 'Không có khách sạn phù hợp'}
                        </div>
                        <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                        <span></span>
                        <DisplaySelction display={display} setDisplay={setDisplay} />
                    </div>

                    <div className={cx('hotel-list', { grid: display === 'grid' })}>
                        {hotels.length > 0 &&
                            hotels.map((hotel) => {
                                return display === 'list' ? (
                                    <HotelItem key={`hotel-item-${hotel.id}`} hotel={hotel} />
                                ) : (
                                    <HotelCard key={`hotel-item-${hotel.id}`} hotel={hotel} />
                                );
                            })}
                    </div>

                    <Pagination total={totalPages} />
                </div>
            </div>
        </div>
    );
};

export default Search;
