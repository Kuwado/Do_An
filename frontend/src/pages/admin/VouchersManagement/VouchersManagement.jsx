import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './VouchersManagement.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { formatPrice } from '@/utils/stringUtil';
import { deleteVoucher, getVouchers } from '@/services/VoucherService';
import { formatDate } from '@/utils/stringUtil';
import VoucherCreate from './VoucherCreate/VoucherCreate';
import VoucherEdit from './VoucherEdit/VoucherEdit';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const FILTER_TYPE = {
    '': 'Tất cả',
    room: 'Đặt phòng',
    service: 'Dịch vụ',
};

const FILTER_DISCOUNT_TYPE = {
    '': 'Tất cả',
    percent: 'Phần trăm',
    fixed: 'Giá trị',
};

const FILTER_STATUS = {
    '': 'Tất cả',
    active: 'Hoạt động',
    soon: 'Sắp đến',
    expired: 'Hết hạn',
};

const SORT_DATE = {
    '': 'Tất cả',
    asc: 'Cũ nhất',
    desc: 'Mới nhất',
};

const VouchersManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [vouchers, setVouchers] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [status, setStatus] = useState('');
    const [sortDate, setSortDate] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVouchers = async () => {
        setLoading(true);
        const res = await getVouchers({
            hotelId: admin.hotel_id,
            type,
            discountType,
            name,
            status,
            sortDate,
            page,
            limit,
        });
        if (!res.success) {
            setError(res.message);
        } else {
            setVouchers(res.vouchers);
            setTotalPages(res.totalPages);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchVouchers();
    }, [admin, name, type, discountType, status, sortDate, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleDeleteVoucher = async (voucher = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa dịch vụ ${voucher.name} không`);
        if (confirmed) {
            const res = await deleteVoucher(voucher.id);
            if (res.success) {
                toast.success(res.message);
                fetchVouchers();
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('vouchers-management-page')}>
            <div className={cx('header')}>
                <div className={cx('left-header')}>
                    <div className={cx('search-bar')}>
                        <SearchOneValue id="search" label="Tên voucher" value={name} setValue={setName} />
                    </div>

                    <Dropdown label="Loại áp dụng" selected={FILTER_TYPE[type]} width="150px" outline>
                        <div onClick={() => setType('room')}>{FILTER_TYPE['room']}</div>
                        <div onClick={() => setType('service')}>{FILTER_TYPE['service']}</div>
                        <div onClick={() => setType('')}>{FILTER_TYPE['']}</div>
                    </Dropdown>

                    <Dropdown
                        label="Loại chiết khấu"
                        selected={FILTER_DISCOUNT_TYPE[discountType]}
                        width="150px"
                        outline
                    >
                        <div onClick={() => setDiscountType('percent')}>{FILTER_DISCOUNT_TYPE['percent']}</div>
                        <div onClick={() => setDiscountType('fixed')}>{FILTER_DISCOUNT_TYPE['fixed']}</div>
                        <div onClick={() => setDiscountType('')}>{FILTER_DISCOUNT_TYPE['']}</div>
                    </Dropdown>

                    <Dropdown label="Trạng thái" selected={FILTER_STATUS[status]} width="150px" outline>
                        <div onClick={() => setStatus('active')}>{FILTER_STATUS['active']}</div>
                        <div onClick={() => setStatus('soon')}>{FILTER_STATUS['soon']}</div>
                        <div onClick={() => setStatus('expired')}>{FILTER_STATUS['expired']}</div>
                        <div onClick={() => setStatus('')}>{FILTER_STATUS['']}</div>
                    </Dropdown>

                    <Dropdown label="Thời gian" selected={SORT_DATE[sortDate]} width="150px" outline>
                        <div onClick={() => setSortDate('asc')}>{SORT_DATE['asc']}</div>
                        <div onClick={() => setSortDate('desc')}>{SORT_DATE['desc']}</div>
                        <div onClick={() => setSortDate('')}>{SORT_DATE['']}</div>
                    </Dropdown>
                </div>

                <VoucherCreate fetchVouchers={fetchVouchers} />
            </div>

            {vouchers.length > 0 ? (
                <table className={cx('vouchers-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên voucher</th>
                            <th>Mã giảm giá</th>
                            <th>Loại áp dụng</th>
                            <th>Chiết khấu</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher, index) => (
                            <tr key={`voucher-${voucher.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>{voucher.name}</td>
                                <td>{voucher.code}</td>
                                <td>
                                    <div className={cx('type', voucher.type)}>{FILTER_TYPE[voucher.type]}</div>
                                </td>
                                <td>
                                    {voucher.discount_type === 'fixed'
                                        ? formatPrice(voucher.discount)
                                        : `${parseInt(voucher.discount)}%`}
                                </td>
                                <td>{formatDate(voucher.start_date)}</td>
                                <td>{formatDate(voucher.end_date)}</td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <VoucherEdit voucherId={voucher.id} fetchVouchers={fetchVouchers} />
                                        <Button
                                            className={cx('delete-btn')}
                                            small
                                            onClick={() => handleDeleteVoucher(voucher)}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Không tìm thấy loại phòng</div>
            )}

            {totalPages > 1 && (
                <div className={cx('pagination-container')}>
                    <Pagination total={totalPages} />
                </div>
            )}
        </div>
    );
};
export default VouchersManagement;
