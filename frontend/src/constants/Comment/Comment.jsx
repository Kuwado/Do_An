import classNames from 'classnames/bind';

import styles from './Comment.module.scss';
import Image from '@/components/Image';
import images from '@/assets/images';
import Rating from '@/constants/Rating';
import { formatDate } from '@/utils/stringUtil';

const cx = classNames.bind(styles);

const Comment = ({ review = {} }) => {
    return (
        <div className={cx('comment')}>
            <div className={cx('left')}>
                <Image className={cx('avatar')} src={review.user.avatar ?? images.avatar} />
            </div>

            <div className={cx('right')}>
                <div className={cx('name')}>
                    {review.user.first_name} {review.user.last_name}
                </div>
                <div className={cx('rating-and-time')}>
                    <Rating rate={review.rating} />
                    <span>{formatDate(review.created_at)}</span>
                </div>
                <div className={cx('comment-text')}>{review.comment}</div>
                {review.images && (
                    <div className={cx('comment-images')}>
                        {review.images.length > 0 &&
                            review.images
                                .slice(0, 5)
                                .map((image, index) => (
                                    <Image
                                        key={`cmt-image-${review.id}-${index}`}
                                        className={cx('comment-image')}
                                        src={image}
                                        alt="comment-image"
                                    />
                                ))}

                        {review.images.length > 5 && (
                            <div className={cx('show-all-images')}>+{review.images.length - 5}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
