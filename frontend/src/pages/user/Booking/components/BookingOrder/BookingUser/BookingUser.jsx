import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BookingUser.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

const cx = classNames.bind(styles);

const BookingUser = ({ hotelId }) => {
    const navigate = useNavigate();
    const { user } = useProfile();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);
            setEmail(user.email);
        }
    }, [user]);

    return (
        <div className={cx('booking-user')}>
            <div className={cx('booking-content')}>
                <div className={cx('title')}>Thông tin liên hệ</div>
                <Input value={first_name} setValue={setFirstName} label="Họ" required />
                <Input value={last_name} setValue={setLastName} label="Tên" required />
                <Input value={phone} setValue={setPhone} label="Số điện thoại" required />
                <Input value={email} setValue={setEmail} label="Email" required />
                <Button className={cx('update-btn')} secondary>
                    Cập nhật
                </Button>
            </div>

            <div className={cx('booking-content')}>
                <div className={cx('title')}>Xác thực thông tin</div>
                <div>Sau khi kiểm tra các chính xác các thông tin cơ bản hãy đến bước tiếp theo</div>
                <div className={cx('action-btns')}>
                    <Button primaryBorder transparent width="130px" onClick={() => navigate(-1)}>
                        Quay lại
                    </Button>
                    <Button secondary width="130px" to={`/hotels/${hotelId}/payment`}>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookingUser;
