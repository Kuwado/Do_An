import classNames from 'classnames/bind';

import styles from '../Search.module.scss';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const DisplaySelction = ({ display, setDisplay }) => {
    return (
        <div className={cx('display-selection')}>
            <div className={cx('display-title')}>Hiển thị:</div>

            <div className={cx('display-container')}>
                <div
                    className={cx('display-option', { active: display === 'grid' })}
                    onClick={() => setDisplay('grid')}
                >
                    <FontAwesomeIcon icon={faGrip} />
                </div>
                <div
                    className={cx('display-option', { active: display === 'list' })}
                    onClick={() => setDisplay('list')}
                >
                    <FontAwesomeIcon icon={faList} />
                </div>
            </div>
        </div>
    );
};

export default DisplaySelction;
