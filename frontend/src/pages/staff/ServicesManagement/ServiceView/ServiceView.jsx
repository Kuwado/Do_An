import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import { formatPrice } from '@/utils/stringUtil';

const cx = classNames.bind(styles);

const FILTER_CATEGORY = {
    dining: 'Ăn uống',
    entertainment: 'Giải trí',
    facilities: 'Tiện ích',
};

const ServiceView = ({ service = {} }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button className={cx('view-btn')} small onClick={() => setShow(true)}>
                <VisibilityIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('service-view')}>
                    <div className={cx('title')}>Thông tin dịch vụ</div>

                    <div className={cx('category', service.category)}>{FILTER_CATEGORY[service.category]}</div>

                    <div className={cx('slider')}>
                        <FullScreenSlider
                            className="hover card"
                            images={service.images || ['']}
                            height="100%"
                            autoPlay={false}
                            link={true}
                        />
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Tên dịch vụ:</div>
                        <div className={cx('item-content')}>{service.name}</div>
                    </div>

                    <div className={cx('item')}>
                        <div className={cx('item-title')}>Giá dịch vụ:</div>
                        <div className={cx('item-content')}>{formatPrice(service.price)}</div>
                    </div>

                    <div className={cx('item', 'des')}>
                        <div className={cx('item-title')}>Mô tả về dịch vụ:</div>
                        <div className={cx('item-content')}>{service.description}</div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default ServiceView;
