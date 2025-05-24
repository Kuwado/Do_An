import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SearchCreate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Dropdown from '@/components/Dropdown';
import TextArea from '@/components/TextArea/TextArea';
import UploadImages from '@/constants/UploadImages';
import { createService } from '@/services/ServiceHotelService';

const cx = classNames.bind(styles);

const FILTER_CATEGORY = {
    dining: 'Ăn uống',
    entertainment: 'Giải trí',
    facilities: 'Tiện ích',
};

const ServiceCreate = ({ fetchServices }) => {
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

    const handleAddService = async () => {
        if (!service.name) {
            alert('Vui lòng nhập tên dịch vụ');
        } else if (!service.price) {
            alert('Vui lòng nhập giá dịch vụ');
        } else {
            const res = await createService({
                name: service.name,
                description: service.description,
                price: service.price,
                category: service.category,
                images: service.images,
            });

            alert(res.message);
            if (res.success) {
                fetchServices();
                setService({
                    name: '',
                    images: [],
                    description: '',
                    category: 'dining',
                    price: '',
                });
            }
        }
    };

    return (
        <>
            <Button secondary curved leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setShow(true)}>
                Thêm dịch vụ mới
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('service-create')}>
                    <div className={cx('title')}>Thêm dịch vụ mới</div>
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
                            label="Mô tả về phòng"
                            id="service-des"
                            value={service.description}
                            setValue={(value) => setServiceValue('description', value)}
                            required
                        />

                        <div className={cx('upload-container')}>
                            <UploadImages
                                images={service.images}
                                setImages={(value) => setServiceValue('images', value)}
                                append={true}
                                limit={8}
                            />
                        </div>
                    </div>

                    <div className={cx('add-btn-container')}>
                        <Button secondary curved onClick={handleAddService}>
                            Thêm dịch vụ
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default ServiceCreate;
