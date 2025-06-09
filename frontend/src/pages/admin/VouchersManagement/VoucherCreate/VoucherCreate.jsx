import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VoucherCreate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, DateInput } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import TextArea from '@/components/TextArea/TextArea';
import { getDate } from '@/utils/dateUtil';
import { createVoucher } from '@/services/VoucherService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const FILTER_TYPE = {
    room: 'Đặt phòng',
    service: 'Dịch vụ',
};

const FILTER_DISCOUNT_TYPE = {
    percent: 'Phần trăm',
    fixed: 'Giá trị',
};

const VoucherCreate = ({ fetchVouchers }) => {
    const [show, setShow] = useState(false);
    const [voucher, setVoucher] = useState({
        code: '',
        name: '',
        type: 'room',
        description: '',
        discount: '',
        discount_type: 'fixed',
        start_date: getDate(0),
        end_date: '',
    });

    const setVoucherValue = (field, value) => {
        setVoucher((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddVoucher = async () => {
        if (!voucher.name) {
            toast.warning('Vui lòng nhập tên voucher');
        } else if (!voucher.code) {
            toast.warning('Vui lòng nhập mã voucher');
        } else if (!voucher.discount) {
            toast.warning('Vui lòng nhập chiết khấu');
        } else if (!voucher.end_date) {
            toast.warning('Vui lòng nhập ngày hết hạn');
        } else if (!voucher.start_date) {
            toast.warning('Vui lòng nhập ngày bắt đầu');
        } else {
            const res = await createVoucher({
                code: voucher.code,
                name: voucher.name,
                type: voucher.type,
                description: voucher.description,
                discount: voucher.discount,
                discountType: voucher.discount_type,
                startDate: voucher.start_date,
                endDate: voucher.end_date,
            });

            if (res.success) {
                toast.success(res.message);
                fetchVouchers();
                setVoucher({
                    code: '',
                    name: '',
                    type: 'room',
                    description: '',
                    discount: '',
                    discount_type: 'fixed',
                    start_date: getDate(0),
                    end_date: '',
                });
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <>
            <Button secondary curved leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setShow(true)}>
                Thêm voucher mới
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('voucher-create')}>
                    <div className={cx('title')}>Thêm voucher mới</div>
                    <div className={cx('content')}>
                        <Input
                            label="Tên Voucher"
                            id="voucher-name"
                            value={voucher.name}
                            setValue={(value) => setVoucherValue('name', value)}
                            required
                        />
                        <Input
                            label="Mã giảm giá"
                            id="voucher-code"
                            value={voucher.code}
                            setValue={(value) => setVoucherValue('code', value)}
                            required
                        />
                        <Dropdown
                            className={cx('category')}
                            label="Loại áp dụng"
                            selected={FILTER_TYPE[voucher.type]}
                            width="100%"
                            outline
                        >
                            <div onClick={() => setVoucherValue('type', 'room')}>{FILTER_TYPE['room']}</div>
                            <div onClick={() => setVoucherValue('type', 'service')}>{FILTER_TYPE['service']}</div>
                        </Dropdown>
                        <Input
                            label="Chiết khấu"
                            id="voucher-discount"
                            type="number"
                            value={voucher.discount}
                            setValue={(value) => setVoucherValue('discount', value)}
                            required
                        />
                        <Dropdown
                            className={cx('category')}
                            label="Loại chiết khấu"
                            selected={FILTER_DISCOUNT_TYPE[voucher.discount_type]}
                            width="100%"
                            outline
                        >
                            <div onClick={() => setVoucherValue('discount_type', 'fixed')}>
                                {FILTER_DISCOUNT_TYPE['fixed']}
                            </div>
                            <div onClick={() => setVoucherValue('discount_type', 'percent')}>
                                {FILTER_DISCOUNT_TYPE['percent']}
                            </div>
                        </Dropdown>
                        <div className={cx('date-container')}>
                            <DateInput
                                value={voucher.start_date}
                                setValue={(value) => setVoucherValue('start_date', value)}
                                label="Ngày bắt đầu"
                                max={voucher.end_date}
                            />
                            <DateInput
                                value={voucher.end_date}
                                setValue={(value) => setVoucherValue('end_date', value)}
                                label="Ngày hết hạn"
                                min={voucher.start_date}
                            />
                        </div>
                        <TextArea
                            label="Mô tả về voucher"
                            id="voucher-des"
                            value={voucher.description}
                            setValue={(value) => setVoucherValue('description', value)}
                            required
                        />
                    </div>

                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleAddVoucher}>
                            Thêm Voucher
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default VoucherCreate;
