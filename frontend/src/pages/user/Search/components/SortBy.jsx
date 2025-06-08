import classNames from 'classnames/bind';

import styles from '../Search.module.scss';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SortBy = ({ sortBy = 'price-asc', setSortBy }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [selected, setSelected] = useState('Giá từ thấp đến cao');

    const handleSort = (sort, select) => {
        setSortBy(sort);
        setSelected(select);
        params.set('sortBy', sort);
        navigate(`?${params.toString()}`);
    };

    return (
        <Dropdown label="Xếp theo:" selected={selected} width="240px">
            <div
                className={cx('sort-item', { active: sortBy === 'price-desc' })}
                onClick={() => handleSort('price-desc', 'Giá từ cao xuống thấp')}
            >
                Giá từ cao xuống thấp
            </div>
            <div
                className={cx('sort-item', { active: sortBy === 'price-asc' })}
                onClick={() => handleSort('price-asc', 'Giá từ thấp đến cao')}
            >
                Giá từ thấp đến cao
            </div>
            <div
                className={cx('sort-item', { active: sortBy === 'rating-desc' })}
                onClick={() => handleSort('rating-desc', 'Đánh giá cao')}
            >
                Đánh giá cao
            </div>
        </Dropdown>
    );
};

export default SortBy;
