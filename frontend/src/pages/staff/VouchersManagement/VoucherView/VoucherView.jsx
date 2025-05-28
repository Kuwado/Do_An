import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VoucherView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, DateInput } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import TextArea from '@/components/TextArea/TextArea';
import { formatPrice } from '@/utils/stringUtil';
import { formatDate } from '../../../../utils/stringUtil';

const cx = classNames.bind(styles);

const FILTER_TYPE = {
    room: 'Đặt phòng',
    service: 'Dịch vụ',
};

const FILTER_DISCOUNT_TYPE = {
    percent: 'Phần trăm',
    fixed: 'Giá trị',
};

const VoucherView = ({ voucher = {} }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button className={cx('view-btn')} small onClick={() => setShow(true)}>
                <VisibilityIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('voucher-view')}>
                    <div className={cx('title')}>Thông tin Voucher</div>

                    <div className={cx('category', voucher.type)}>{FILTER_TYPE[voucher.type]}</div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Tên voucher:</div>
                        <div className={cx('item-content')}>{voucher.name}</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Mã giảm giá:</div>
                        <div className={cx('item-content')}>{voucher.code}</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Chiết khấu:</div>
                        <div className={cx('item-content')}>
                            {voucher.discount_type === 'fixed'
                                ? formatPrice(voucher.discount)
                                : `${parseInt(voucher.discount)}%`}
                        </div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Ngày bắt đầu:</div>
                        <div className={cx('item-content')}>{formatDate(voucher.start_date)}</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Ngày hết hạn:</div>
                        <div className={cx('item-content')}>{formatDate(voucher.end_date)}</div>
                    </div>

                    <div className={cx('item', 'des')}>
                        <div className={cx('item-title')}>Mô tả về voucher:</div>
                        <div className={cx('item-content')}>{voucher.description || 'Không có'}</div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default VoucherView;
