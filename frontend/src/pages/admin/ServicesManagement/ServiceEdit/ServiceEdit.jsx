import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceEdit.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import useProfile from '@/hooks/profile/useProfile';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input, QuantityInput } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import TextArea from '@/components/TextArea/TextArea';
import UploadImages from '@/constants/UploadImages';
import { createRoomType } from '@/services/RoomService';
import { getAmenitiesByHotelId, updateRoomTypeAmenities } from '@/services/AmenityService';
import { createService, getService, updateService } from '../../../../services/ServiceHotelService';

const cx = classNames.bind(styles);

const FILTER_CATEGORY = {
    dining: 'Ăn uống',
    entertainment: 'Giải trí',
    facilities: 'Tiện ích',
};

const ServiceEdit = ({ serviceId, fetchServices }) => {
    const [show, setShow] = useState(false);
    const [service, setService] = useState({
        name: '',
        images: [],
        description: '',
        category: 'dining',
        price: '',
    });

    const setServiceValue = (field, value) => {
        setService((prev) => ({ ...prev, [field]: value }));
    };

    const fetchService = async () => {
        const res = await getService({ id: serviceId });
        if (res.success) {
            setService(res.service);
        } else {
            alert(res.message);
        }
    };

    useEffect(() => {
        fetchService();
    }, [serviceId]);

    const handleUpdateService = async () => {
        if (!service.name) {
            alert('Vui lòng nhập tên dịch vụ');
        } else if (!service.price) {
            alert('Vui lòng nhập giá dịch vụ');
        } else {
            const res = await updateService(serviceId, {
                name: service.name,
                description: service.description,
                price: service.price,
                category: service.category,
                images: service.images,
            });

            alert(res.message);
            if (res.success) {
                fetchServices();
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
                <div className={cx('service-edit')}>
                    <div className={cx('title')}>Cập nhật dịch vụ</div>
                    <div className={cx('content')}>
                        <Input
                            label="Tên dịch vụ"
                            id="service-name"
                            value={service.name}
                            setValue={(value) => setServiceValue('name', value)}
                            required
                        />
                        <Dropdown
                            className={cx('category')}
                            label="Loại dịch vụ"
                            selected={FILTER_CATEGORY[service.category]}
                            width="100%"
                            outline
                        >
                            <div onClick={() => setServiceValue('category', 'dining')}>{FILTER_CATEGORY['dining']}</div>
                            <div onClick={() => setServiceValue('category', 'entertainment')}>
                                {FILTER_CATEGORY['entertainment']}
                            </div>
                            <div onClick={() => setServiceValue('category', 'facilities')}>
                                {FILTER_CATEGORY['facilities']}
                            </div>
                        </Dropdown>
                        <Input
                            label="Giá tiền"
                            id="service-price"
                            type="number"
                            value={service.price}
                            setValue={(value) => setServiceValue('price', value)}
                            required
                        />
                        <TextArea
                            label="Mô tả về dịch vụ"
                            id="service-des"
                            value={service.description}
                            setValue={(value) => setServiceValue('description', value)}
                            required
                        />

                        <div className={cx('upload-container')}>
                            <UploadImages
                                images={service.images || []}
                                setImages={(value) => setServiceValue('images', value)}
                                limit={8}
                            />
                        </div>
                    </div>

                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleUpdateService}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default ServiceEdit;
