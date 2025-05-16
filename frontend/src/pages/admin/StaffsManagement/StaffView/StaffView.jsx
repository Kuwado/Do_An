import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './StaffView.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '@/components/Popup';
import { Button } from '@/components/Button';
import Image from '@/components/Image';
import images from '@/assets/images';

const cx = classNames.bind(styles);

const StaffView = ({ staff = {} }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button className={cx('view-btn')} small onClick={() => setShow(true)}>
                <VisibilityIcon />
            </Button>
            <Popup show={show} setShow={setShow}>
                <div className={cx('staff-view')}>
                    <div className={cx('role-tag', staff.role)}>
                        {staff.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                    </div>
                    <div className={cx('avatar')}>
                        <Image src={staff.avatar ?? images.avatar} alt="avatar" />
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>Thông tin cá nhân</div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Họ:</div>
                            <div className={cx('item-content')}>{staff.first_name}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Tên:</div>
                            <div className={cx('item-content')}>{staff.last_name}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Tên đăng nhập:</div>
                            <div className={cx('item-content')}>{staff.username}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Số điện thoại:</div>
                            <div className={cx('item-content')}>{staff.phone}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Email:</div>
                            <div className={cx('item-content')}>{staff.email}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-title')}>Địa chỉ:</div>
                            <div className={cx('item-content')}>{staff.address}</div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default StaffView;
