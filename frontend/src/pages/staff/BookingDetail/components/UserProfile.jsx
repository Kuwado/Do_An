import classNames from 'classnames/bind';

import styles from '../BookingDetail.module.scss';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

const UserProfile = ({ user }) => {
    return (
        <div className={cx('booking-part', 'user')}>
            <div className={cx('part-title')}>Thông tin khách hàng</div>
            <div className={cx('part-content')}>
                <div className={cx('top')}>
                    <div className={cx('top-left')}>
                        <div className={cx('avatar')}>
                            <Image src={user.avatar} alt="avatar" circle />
                        </div>
                    </div>

                    <div className={cx('top-right')}>
                        <div className={cx('part-item')}>
                            <div className={cx('part-label')}>Họ và tên:</div>
                            <div>
                                {user.first_name} {user.last_name}
                            </div>
                        </div>
                        <div className={cx('part-item')}>
                            <div className={cx('part-label')}>Số điện thoại:</div>
                            <div>{user.phone}</div>
                        </div>
                        <div className={cx('part-item')}>
                            <div className={cx('part-label')}>Email:</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số lần sử dụng:</div>
                    <div>{user.booked_count_all}</div>
                </div>

                <div className={cx('part-item')}>
                    <div className={cx('part-label')}>Số lần đặt ở đây:</div>
                    <div>{user.booked_count}</div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
