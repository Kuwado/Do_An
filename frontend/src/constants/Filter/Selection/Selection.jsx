import classNames from 'classnames/bind';

import styles from './Selection.module.scss';
import { useState } from 'react';
import { IconButton } from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const SELECTIONS = [
    {
        id: 1,
        name: 'option 1',
    },
    {
        id: 2,
        name: 'option 2',
    },
    {
        id: 3,
        name: 'option 3',
    },
    {
        id: 4,
        name: 'option 4',
    },
    {
        id: 5,
        name: 'option 5',
    },
    {
        id: 6,
        name: 'option 6',
    },
    {
        id: 7,
        name: 'option 7',
    },
];

const Selection = ({
    title = 'Title',
    id = '',
    selections = SELECTIONS,
    selected = [],
    active = false,
    count = false,
    setSelected = fn,
}) => {
    const [show, setShow] = useState(active);
    const [showAll, setShowAll] = useState(active);

    const handleSelect = (e, value) => {
        const current = Array.isArray(selected) ? selected : [];
        const newSelected = e.target.checked ? [...current, value] : current.filter((select) => select !== value);
        setSelected(newSelected);
    };

    return (
        <div className={cx('filter-selection', { show, showAll })}>
            <div className={cx('header')}>
                <div className={cx('title')}>{title}</div>
                <IconButton secondary small onClick={() => setShow((prev) => !prev)}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </IconButton>
            </div>

            <div className={cx('body')}>
                <div className={cx('selections')}>
                    {selections.length > 0 &&
                        selections.map((select) => (
                            <div key={`selection-${id}-${select.id}`} className={cx('select-item')}>
                                <input
                                    type="checkbox"
                                    name={`selection-${id}-${select.id}`}
                                    id={`selection-${id}-${select.id}`}
                                    checked={selected.includes(select.id)}
                                    onChange={(e) => handleSelect(e, select.id)}
                                />
                                <label htmlFor={`selection-${id}-${select.id}`}>
                                    {select.name} {count && select.count}
                                </label>
                            </div>
                        ))}
                </div>

                {selections.length > 5 && (
                    <button className={cx('show-all-btn')} onClick={() => setShowAll((prev) => !prev)}>
                        {showAll ? 'Ẩn bớt' : 'Xem tất cả'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Selection;
