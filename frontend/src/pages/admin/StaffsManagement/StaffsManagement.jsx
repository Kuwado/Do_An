import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './StaffsManagement.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchOneValue from '@/constants/SearchOneValue';
import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Pagination from '@/constants/Pagination/Pagination';
import StaffView from './StaffView/StaffView';
import StaffCreate from './StaffCreate/StaffCreate';
import { deleteStaff, getStaffsByHotelId } from '@/services/StaffService';

const cx = classNames.bind(styles);

const StaffsManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [staffs, setStaffs] = useState([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStaffs = async () => {
        setLoading(true);
        const currentPage = params.get('page') || 1;
        setPage(currentPage);
        const res = await getStaffsByHotelId({ hotelId: admin.hotel_id, name, role, page: currentPage, limit });
        if (!res.success) {
            setError(res.message);
        } else {
            setStaffs(res.staffs);
            setTotalPages(res.totalPages);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchStaffs();
    }, [admin, name, role, location.search]);

    const handleDeleteStaff = async (staff = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa nhân viên ${staff.first_name} ${staff.last_name} không`);
        if (confirmed) {
            const res = await deleteStaff(staff.id);
            alert(res.message);
            if (res.success) {
                fetchStaffs();
            }
        }
    };

    const getRole = () => {
        if (role === 'admin') {
            return 'Quản trị viên';
        } else if (role === 'staff') {
            return 'Nhân viên';
        } else {
            return 'Tất cả';
        }
    };

    return (
        <div className={cx('staffs-management-page')}>
            <div className={cx('header')}>
                <div className={cx('search-bar')}>
                    <SearchOneValue
                        id="search"
                        label="Tên nhân viên"
                        value={name}
                        setValue={setName}
                        onClick={fetchStaffs}
                    />
                </div>

                <Dropdown selected={getRole()} width="150px" outline>
                    <div onClick={() => setRole('staff')}>Nhân viên</div>
                    <div onClick={() => setRole('admin')}>Quản trị viên</div>
                    <div onClick={() => setRole('')}>Tất cả</div>
                </Dropdown>

                <StaffCreate fetchStaffs={fetchStaffs} />
            </div>

            {staffs.length > 0 ? (
                <table className={cx('staffs-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map((staff, index) => (
                            <tr key={`staff-${staff.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>
                                    {staff.first_name} {staff.last_name}
                                </td>
                                <td>{staff.phone || 'Không có'}</td>
                                <td>{staff.email || 'Không có'}</td>
                                <td>{staff.address || 'Không có'}</td>
                                <td>
                                    <div className={cx(staff.role)}>
                                        {staff.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <StaffView staff={staff} />

                                        <Button
                                            className={cx('delete-btn')}
                                            small
                                            onClick={() => handleDeleteStaff(staff)}
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
                <div>Không tìm thấy nhân viên</div>
            )}

            {totalPages > 1 && (
                <div className={cx('pagination-container')}>
                    <Pagination total={totalPages} />
                </div>
            )}
        </div>
    );
};

export default StaffsManagement;
