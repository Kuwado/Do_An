import classNames from 'classnames/bind';

import styles from './Accordion.module.scss';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Accordion = ({ header, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={cx('accordion', { show: isOpen })}>
            <div className={cx('header')}>
                {header}
                <div className={cx('icon')} onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </div>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default Accordion;
