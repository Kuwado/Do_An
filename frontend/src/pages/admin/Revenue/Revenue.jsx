import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Revenue.module.scss';
import moment from 'moment';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useProfile from '@/hooks/profile/useProfile';
import { getRevenue } from '@/services/RevenueService';
import { formatPrice } from '@/utils/stringUtil';
import Loading from '@/constants/Loading/Loading';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Revenue = () => {
    const { admin } = useProfile();
    const [revenueData, setRevenueData] = useState({ daily: [], monthly: [], yearly: [] });
    const [tab, setTab] = useState('daily');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const tabOptions = [
        { key: 'daily', label: '7 ngày gần nhất' },
        { key: 'monthly', label: '6 tháng gần nhất' },
        { key: 'yearly', label: '3 năm gần nhất' },
    ];

    useEffect(() => {
        const fetchRevenue = async () => {
            setLoading(true);
            const res = await getRevenue({ hotelId: admin.hotel_id });
            if (res.success) {
                setRevenueData(res.revenues);
            } else {
                toast.error(res.message);
            }
            setLoading(false);
        };

        fetchRevenue();
    }, [admin.hotel_id]);

    const calculateYAxisDomain = () => {
        if (!revenueData[tab] || revenueData[tab].length === 0) {
            return ['auto', 'auto'];
        }

        const revenues = revenueData[tab].map((item) => item.revenue);
        const minRevenue = Math.min(...revenues);
        const maxRevenue = Math.max(...revenues);

        // Thêm một khoảng đệm (padding) để tránh giá trị bị sát mép biểu đồ
        const padding = (maxRevenue - minRevenue) * 0.1; // 10% padding
        const finalMin = Math.floor((minRevenue - padding) / 100000) * 100000; // Làm tròn xuống
        const finalMax = Math.ceil((maxRevenue + padding) / 100000) * 100000; // Làm tròn lên

        return [finalMin < 0 ? 0 : finalMin, finalMax]; // Đảm bảo min không âm
    };

    // Hàm định dạng ngày tháng
    const formatXAxisTick = (tickItem) => {
        switch (tab) {
            case 'daily':
                return moment(tickItem).format('DD/MM/YYYY');
            case 'monthly':
                return moment(tickItem).format('MM/YYYY');
            case 'yearly':
                return moment(tickItem).format('YYYY');
            default:
                return tickItem; // Fallback
        }
    };

    const customTooltipLabelFormatter = (label) => {
        switch (tab) {
            case 'daily':
                return `Ngày: ${moment(label).format('DD/MM/YYYY')}`;
            case 'monthly':
                return `Tháng: ${moment(label).format('MM/YYYY')}`;
            case 'yearly':
                return `Năm: ${moment(label).format('YYYY')}`;
            default:
                return label;
        }
    };

    const customTooltipFormatter = (value, name, props) => {
        if (props.dataKey === 'revenue') {
            // Đảm bảo chỉ áp dụng cho dataKey 'revenue'
            return [`${formatPrice(value)}`, 'Thu nhập'];
        }
        // return [formatPrice(value), name];
    };

    return (
        <div className={cx('revenue-page')}>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('tabs')}>
                        {tabOptions.map(({ key, label }) => (
                            <button
                                key={key}
                                className={cx('tab', { active: tab === key })}
                                onClick={() => setTab(key)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className={cx('chart')}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={revenueData[tab]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="report_date" tickFormatter={formatXAxisTick} />
                                <YAxis
                                    tickCount={7}
                                    tickFormatter={(value) => `${value / 1_000_000}tr`}
                                    domain={calculateYAxisDomain()} // Sử dụng hàm tính toán domain
                                />
                                <Tooltip
                                    labelFormatter={customTooltipLabelFormatter}
                                    formatter={customTooltipFormatter}
                                />

                                {/* Cột doanh thu */}
                                <Bar dataKey="revenue" barSize={40} fill="#0194f3" />

                                {/* Đường biểu diễn doanh thu */}
                                <Line type="monotone" dataKey="revenue" stroke="#FFC107" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Revenue;
