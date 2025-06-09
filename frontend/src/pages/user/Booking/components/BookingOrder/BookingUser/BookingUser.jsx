import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BookingUser.module.scss';
import useProfile from '@/hooks/profile/useProfile';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { toast } from 'react-toastify';
import { updateUser } from '@/services/UserService';

const cx = classNames.bind(styles);

const BookingUser = ({ hotelId, handlePayment, countDownTime }) => {
    const navigate = useNavigate();
    const { user, fetchUser } = useProfile();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const nextStep = async () => {
        const pendingBookingId = localStorage.getItem('pending_booking_id');
        const createdAt = localStorage.getItem('booking_created_at');
        const expireAt = new Date(createdAt).getTime() + countDownTime * 60 * 1000;
        const now = new Date().getTime();
        const diff = expireAt - now;
        if (pendingBookingId && diff > 0) {
            toast.warning('Bạn đang có phòng được giữ');
        } else {
            await handlePayment();
        }
        navigate(`/hotels/${hotelId}/payment`);
    };

    const handleUpdateUser = async () => {
        if (!first_name) {
            toast.warning('Vui lòng nhập họ');
        } else if (!last_name) {
            toast.warning('Vui lòng nhập tên');
        } else if (!phone) {
            toast.warning('Vui lòng nhập số điện thoại');
        } else {
            const res = await updateUser(user.id, { first_name, last_name, phone, email });
            if (res.success) {
                fetchUser();
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className={cx('booking-user')}>
            <div className={cx('booking-content')}>
                <div className={cx('title')}>Thông tin liên hệ</div>
                <Input value={first_name} setValue={setFirstName} label="Họ" required />
                <Input value={last_name} setValue={setLastName} label="Tên" required />
                <Input value={phone} setValue={setPhone} label="Số điện thoại" required />
                <Input value={email} setValue={setEmail} label="Email" required />
                <Button className={cx('update-btn')} onClick={handleUpdateUser} secondary>
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
                    <Button secondary width="130px" onClick={nextStep}>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookingUser;
