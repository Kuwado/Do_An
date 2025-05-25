import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VoucherEdit.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import useProfile from '@/hooks/profile/useProfile';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, DateInput } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import TextArea from '@/components/TextArea/TextArea';
import { getDate } from '@/utils/dateUtil';

import { getVoucher, updateVoucher } from '../../../../services/VoucherService';

const cx = classNames.bind(styles);

const FILTER_TYPE = {
    room: 'Đặt phòng',
    service: 'Dịch vụ',
};

const FILTER_DISCOUNT_TYPE = {
    percent: 'Phần trăm',
    fixed: 'Giá trị',
};

const VoucherEdit = ({ voucherId, fetchVouchers }) => {
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

    console.log(voucher);

    const setVoucherValue = (field, value) => {
        setVoucher((prev) => ({ ...prev, [field]: value }));
    };

    const fetchVoucher = async () => {
        const res = await getVoucher({ id: voucherId });
        if (res.success) {
            setVoucher(res.voucher);
        } else {
            alert(res.message);
        }
    };

    useEffect(() => {
        fetchVoucher();
    }, [voucherId]);

    const handleUpdateVoucher = async () => {
        if (!voucher.name) {
            alert('Vui lòng nhập tên voucher');
        } else if (!voucher.code) {
            alert('Vui lòng nhập mã voucher');
        } else if (!voucher.discount) {
            alert('Vui lòng nhập chiết khấu');
        } else if (!voucher.end_date) {
            alert('Vui lòng nhập ngày hết hạn');
        } else if (!voucher.start_date) {
            alert('Vui lòng nhập ngày bắt đầu');
        } else {
            const res = await updateVoucher(voucherId, {
                code: voucher.code,
                name: voucher.name,
                type: voucher.type,
                description: voucher.description,
                discount: voucher.discount,
                discount_type: voucher.discount_type,
                start_date: voucher.start_date,
                end_date: voucher.end_date,
            });

            alert(res.message);
            if (res.success) {
                fetchVouchers();
                setShow(false);
            }
        }
    };

    return (
        <>
            <Button className={cx('edit-btn')} small onClick={() => setShow(true)}>
                <EditIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('voucher-edit')}>
                    <div className={cx('title')}>Cập nhật Voucher</div>
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
                            label="Mô tả về phòng"
                            id="voucher-des"
                            value={voucher.description}
                            setValue={(value) => setVoucherValue('description', value)}
                            required
                        />
                    </div>

                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleUpdateVoucher}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default VoucherEdit;
