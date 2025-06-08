import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

// Icon từ Material UI
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('section')}>
                    <h4>Về chúng tôi</h4>
                    <p>
                        Chúng tôi cung cấp nền tảng đặt phòng khách sạn tiện lợi, nhanh chóng và đáng tin cậy cho mọi
                        nhu cầu du lịch và công tác.
                    </p>
                </div>

                <div className={cx('section')}>
                    <h4>Liên kết nhanh</h4>
                    <ul className={cx('links')}>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/hotels">Khách sạn</Link>
                        </li>
                        <li>
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                    </ul>
                </div>

                <div className={cx('section')}>
                    <h4>Liên hệ</h4>
                    <p>Email: support@hotelbooking.vn</p>
                    <p>Hotline: 0123 456 789</p>
                    <p>Địa chỉ: Lương Thế Vinh, Trung Văn, Nam Từ Liêm, Hà Nội</p>
                </div>

                <div className={cx('section')}>
                    <h4>Kết nối với chúng tôi</h4>
                    <div className={cx('socials')}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon />
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('bottom')}>&copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
