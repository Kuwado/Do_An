import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Predict.module.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useProfile from '@/hooks/profile/useProfile';
import { predictGuests } from '@/services/PredictService';
import Image from '@/components/Image';
import Loading from '../../../constants/Loading/Loading';

const cx = classNames.bind(styles);

const today = new Date();

const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

const formattedDate = today.toLocaleDateString('vi-VN', options);

const Predict = () => {
    const { admin } = useProfile();
    const [predicts, setPredicts] = useState({});
    const [predictedData, setPredictedData] = useState([]);
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [temp, setTemp] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPredict = async () => {
            setLoading(true);
            const res = await predictGuests({ hotelId: admin.hotel_id });
            if (res.success) {
                setPredicts(res.predicts);
                setWeather(res.weather);
                setTemp(res.temp);
                setCity(res.city);
                const sortedData = [...res.predictedData].sort((a, b) => new Date(a.date) - new Date(b.date));
                setPredictedData(sortedData);
            }
            setLoading(false);
        };

        if (admin.hotel_id) {
            fetchPredict();
        }
    }, [admin.hotel_id]);

    return (
        <div className={cx('predict-page')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className={cx('predict-header')}>
                        <div className={cx('date')}>{formattedDate}</div>

                        <div className={cx('predict-result')}>
                            <div className={cx('predict-title')}>Dự đoán lượng khách hôm nay</div>
                            <div className={cx('predict-guests')}>
                                {predicts.avg ? `${predicts.avg} khách` : 'Chưa thể dự đoán'}
                            </div>
                        </div>

                        <div className={cx('weather')}>
                            <div className={cx('city')}>{city}</div>
                            <div className={cx('temp')}>{temp} ℃</div>
                            <div className={cx('weather-container')}>
                                {weather.icon && (
                                    <Image
                                        className={cx('weather-icon')}
                                        src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                                    />
                                )}
                                <div className={cx('weather-des')}>{weather.description}</div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('predict-chart')}>
                        <h2 className={cx('title')}>Dự đoán 7 ngày gần nhất</h2>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={predictedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis label={{ value: 'Số khách', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="predicted_guests" name="Dự đoán" stroke="#8884d8" />
                                <Line type="monotone" dataKey="actual_guests" name="Thực tế" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default Predict;
