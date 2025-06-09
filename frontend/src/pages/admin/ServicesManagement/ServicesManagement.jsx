import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './ServicesManagement.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import SearchOneValue from '@/constants/SearchOneValue';
import Pagination from '@/constants/Pagination';
import { formatPrice } from '@/utils/stringUtil';
import { deleteService, getAllServicesByHotelId } from '@/services/ServiceHotelService';
import ServiceCreate from './ServiceCreate/ServiceCreate';
import ServiceEdit from './ServiceEdit/ServiceEdit';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const FILTER_CATEGORY = {
    '': 'Tất cả',
    dining: 'Ăn uống',
    entertainment: 'Giải trí',
    facilities: 'Tiện ích',
};

const SORT_PRICE = {
    '': 'Tất cả',
    asc: 'Tăng dần',
    desc: 'Giảm dần',
};

const ServicesManagement = () => {
    const { admin } = useProfile();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const limit = 8;
    const [page, setPage] = useState(params.get('page') || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalservices, setTotalservices] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        setLoading(true);
        const res = await getAllServicesByHotelId({ hotelId: admin.hotel_id, name, category, sortPrice, page, limit });
        if (!res.success) {
            setError(res.message);
        } else {
            setServices(res.services);
            setTotalPages(res.totalPages);
            setTotalservices(res.totalItems);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (admin.hotel_id) fetchServices();
    }, [admin, name, category, sortPrice, page]);

    useEffect(() => {
        setPage(params.get('page') || 1);
    }, [location.search]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleDeleteService = async (service = {}) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa dịch vụ ${service.name} không`);
        if (confirmed) {
            const res = await deleteService(service.id);
            if (res.success) {
                toast.success(res.message);
                fetchServices();
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('services-management-page')}>
            <div className={cx('header')}>
                <div className={cx('left-header')}>
                    <div className={cx('search-bar')}>
                        <SearchOneValue id="search" label="Tên dịch vụ" value={name} setValue={setName} />
                    </div>

                    <Dropdown label="Loại dịch vụ" selected={FILTER_CATEGORY[category]} width="150px" outline>
                        <div onClick={() => setCategory('dining')}>{FILTER_CATEGORY['dining']}</div>
                        <div onClick={() => setCategory('entertainment')}>{FILTER_CATEGORY['entertainment']}</div>
                        <div onClick={() => setCategory('facilities')}>{FILTER_CATEGORY['facilities']}</div>
                        <div onClick={() => setCategory('')}>{FILTER_CATEGORY['']}</div>
                    </Dropdown>

                    <Dropdown label="Sắp xếp giá" selected={SORT_PRICE[sortPrice]} width="150px" outline>
                        <div onClick={() => setSortPrice('asc')}>{SORT_PRICE['asc']}</div>
                        <div onClick={() => setSortPrice('desc')}>{SORT_PRICE['desc']}</div>
                        <div onClick={() => setSortPrice('')}>{SORT_PRICE['']}</div>
                    </Dropdown>
                </div>

                <ServiceCreate fetchServices={fetchServices} />
            </div>

            {services.length > 0 ? (
                <table className={cx('services-table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên dịch vụ</th>
                            <th>Loại dịch vụ</th>
                            <th>Giá</th>
                            <th>Lượng đặt hôm nay</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={`service-${service.id}`}>
                                <td>{index + 1 + (page - 1) * limit}</td>
                                <td>{service.name}</td>
                                <td>
                                    <div className={cx('category', service.category)}>
                                        {FILTER_CATEGORY[service.category]}
                                    </div>
                                </td>
                                <td>{formatPrice(service.price)}</td>
                                <td>{service.total_bookings} suất đặt</td>
                                <td>
                                    <div className={cx('action-btns')}>
                                        <ServiceEdit serviceId={service.id} fetchServices={fetchServices} />
                                        <Button
                                            className={cx('delete-btn')}
                                            small
                                            onClick={() => handleDeleteService(service)}
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

export default ServicesManagement;
