import classNames from 'classnames/bind';

import styles from './Reviews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import Comment from '@/constants/Comment/Comment';

const cx = classNames.bind(styles);

const Reviews = ({ reviews = [], forwardedRef }) => {
    return (
        <div ref={forwardedRef} className={cx('hotel-reviews')}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={faBed} />
                <span>Đánh giá về khách sạn</span>
            </div>
            <div className={cx('content')}>
                {reviews && reviews.map((review) => <Comment key={`comment-${review.id}`} review={review} />)}
            </div>
        </div>
    );
};

export default Reviews;
