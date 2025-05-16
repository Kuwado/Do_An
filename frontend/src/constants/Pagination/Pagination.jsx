import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Pagination = ({ total }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(Number(params.get('page')) || 1);

    const arrayPages = Array.from({ length: total }, (_, index) => index + 1);
    const pages =
        total < 6
            ? arrayPages
            : currentPage < 4
            ? arrayPages.slice(0, 5)
            : currentPage > total - 3
            ? arrayPages.slice(total - 5, total)
            : arrayPages.slice(currentPage - 3, currentPage + 2);

    console.log(pages);

    const handlePaginate = (page) => {
        setCurrentPage(page);
    };

    const handlePrev = (page) => {
        if (page > 1) {
            setCurrentPage(page - 1);
        }
    };

    const handleNext = (page) => {
        if (page < total) {
            setCurrentPage(page + 1);
        }
    };

    useEffect(() => {
        if (params.get('page') || currentPage > 1) {
            if (currentPage > total) {
                setCurrentPage(1);
            } else {
                params.set('page', currentPage.toString());
                navigate(`${location.pathname}?${params.toString()}`);
            }
        }
    }, [currentPage, total]);

    return (
        <div className={cx('pagination')}>
            <div className={cx('prev-btn')} onClick={() => handlePrev(currentPage)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={cx('body')}>
                {pages.map((page) => (
                    <div
                        key={`pagination-${page}`}
                        className={cx('page-item', { active: page === currentPage })}
                        onClick={() => handlePaginate(page)}
                    >
                        {page}
                    </div>
                ))}
            </div>
            <div className={cx('next-btn')} onClick={() => handleNext(currentPage)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default Pagination;
