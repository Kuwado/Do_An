import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import banner from '@/assets/banner';
import { FullScreenSlider } from '@/constants/Slider';
import SearchBar from '@/constants/Search/SearchBar';
import { getHotels } from '@/services/HotelService';
import { HotelItemSlider } from '@/constants/Slider';
import VoucherSlider from '@/constants/Slider/Voucher/VoucherSlider';
import { getVouchers } from '@/services/VoucherService';
import Image from '@/components/Image';
import images from '@/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGift } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const res = await getHotels({ sortRating: 'desc', limit: 8 });
                setHotels(res.hotels);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchVouchers = async () => {
            setLoading(true);
            try {
                const res = await getVouchers({ hotelId: 'all', limit: 4 });
                setVouchers(res.vouchers);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
        fetchVouchers();
    }, []);

    return (
        <div className={cx('home-page')}>
            <div className={cx('home-banner')}>
                <FullScreenSlider images={banner} height="80vh" />
                <div className={cx('home-search-container')}>
                    <SearchBar />
                </div>
            </div>

            <div className={cx('home-content')}>
                <div className={cx('content-container')}>
                    <Image className={cx('banner')} src={images.home1} alt="home-banner-1" />
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faGift} />
                        <div>Mã ưu đãi tặng bạn mới</div>
                    </div>
                    <VoucherSlider vouchers={vouchers} />
                </div>

                <div className={cx('content-container')}>
                    <Image className={cx('banner')} src={images.home2} alt="home-banner-2" />
                    <div className={cx('title')}>
                        <FontAwesomeIcon icon={faBuilding} />
                        <div>Khách sạn nổi bật</div>
                    </div>
                    <HotelItemSlider hotels={hotels} />
                </div>
            </div>
        </div>
    );
};

export default Home;
