import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BookingReview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Vote from '@/constants/Rating/Vote';
import { createReview } from '@/services/ReviewService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const BookingReview = ({ forwardedRef, booking = {}, fetchBooking }) => {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');

    const handeComment = async () => {
        if (rate === 0) {
            toast.warning('Vui lòng chọn số sao');
        } else if (!comment) {
            toast.warning('Vui lòng nhập đánh giá');
        } else {
            const res = await createReview({ hotelId: booking.hotel.id, bookingId: booking.id, rate, comment });
            if (res.success) {
                toast.success('Đánh giá thành công');
                fetchBooking();
            } else {
                toast.error(res.message);
            }
        }
    };

    useEffect(() => {
        if (booking.review) {
            setRate(booking.review.rating);
            setComment(booking.review.comment);
        }
    }, [booking]);

    return (
        <div className={cx('booking-review')} ref={forwardedRef}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faComment} />
                <div>Đánh giá</div>
            </div>

            <div className={cx('content')}>
                <div>
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Mong bạn có thể dành ít phút cho chúng tôi xin đánh giá
                    về trải nghiệm của bạn tại khách sạn của chúng tôi.
                </div>

                <div className={cx('rating', { 'read-only': booking.review })}>
                    <div>Bạn đánh giá chúng tôi như thế nào</div>
                    <Vote rate={rate} setRate={setRate} large />
                </div>

                <div>
                    <div>Chia sẻ cho chúng tôi một chút cảm nhận của bạn nhé !!!</div>
                    <Input value={comment} setValue={setComment} label="Đánh giá của bạn" readOnly={booking.review} />
                </div>

                {!booking.review && (
                    <Button
                        className={cx('send-btn')}
                        leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        secondary
                        onClick={handeComment}
                    >
                        Gửi đánh giá
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BookingReview;
