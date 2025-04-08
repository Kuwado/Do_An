import classNames from 'classnames/bind';

import styles from './Voucher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faBuilding, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';

const cx = classNames.bind(styles);

const VOUCHER = {
    id: 1,
    name: 'voucher nè',
    description: 'Voucher dành cho người mới, dùng được một lần duy nhất thôi nha',
    type: 'service',
    code: 'VIETHOAN0507',
};

const Voucher = ({ voucher = VOUCHER }) => {
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className={cx('voucher')}>
            <div className={cx('top')}>
                <div className={cx('name-container')}>
                    <div className={cx('icon', { service: voucher.type == 'service' })}>
                        <FontAwesomeIcon icon={voucher.type == 'room' ? faBuilding : faBellConcierge} />
                    </div>
                    <div className={cx('name')}>{voucher.name}</div>
                </div>
                <div className={cx('description')}>{voucher.description}</div>
            </div>

            <div className={cx('center')}>
                <span></span>
            </div>

            <div className={cx('bottom')}>
                <div className={cx('code-container')}>
                    <FontAwesomeIcon icon={faCopy} />
                    <div className={cx('code')}>{voucher.code}</div>
                </div>

                <Button secondary curved small onClick={() => handleCopy(voucher.code)}>
                    Copy
                </Button>
            </div>
        </div>
    );
};

export default Voucher;
