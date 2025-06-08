import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const About = () => {
    return (
        <div className={cx('about-page')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Về Chúng Tôi</h1>

                <section className={cx('section')}>
                    <h2>Sứ mệnh của chúng tôi</h2>
                    <p>
                        Chúng tôi xây dựng nền tảng đặt phòng khách sạn với mong muốn mang đến cho khách hàng trải
                        nghiệm du lịch và nghỉ dưỡng dễ dàng, tiện lợi và an toàn. Từ những chuyến công tác nhanh chóng
                        cho đến kỳ nghỉ dài ngày, chúng tôi luôn đồng hành cùng bạn trên mọi hành trình.
                    </p>
                </section>

                <section className={cx('section')}>
                    <h2>Giá trị cốt lõi</h2>
                    <ul>
                        <li>
                            <strong>Minh bạch:</strong> Giá cả rõ ràng, không phí ẩn.
                        </li>
                        <li>
                            <strong>Tin cậy:</strong> Hợp tác với những khách sạn được đánh giá cao và uy tín.
                        </li>
                        <li>
                            <strong>Hỗ trợ 24/7:</strong> Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bất cứ lúc
                            nào.
                        </li>
                    </ul>
                </section>

                <section className={cx('section')}>
                    <h2>Chúng tôi cung cấp</h2>
                    <p>
                        Với hàng nghìn khách sạn, resort và căn hộ khắp cả nước, bạn có thể dễ dàng tìm được chỗ ở phù
                        hợp nhất với nhu cầu và ngân sách của mình. Ngoài ra, hệ thống của chúng tôi còn hỗ trợ đặt
                        phòng linh hoạt, thanh toán an toàn, cùng với các chương trình ưu đãi hấp dẫn.
                    </p>
                </section>

                <section className={cx('section')}>
                    <h2>Đội ngũ phát triển</h2>
                    <p>
                        Chúng tôi là những con người trẻ, đam mê công nghệ và mong muốn tạo ra một nền tảng du lịch số
                        thông minh, hiện đại. Với sự kết hợp giữa kỹ thuật phần mềm và trải nghiệm người dùng, chúng tôi
                        cam kết không ngừng cải tiến để phục vụ khách hàng tốt hơn mỗi ngày.
                    </p>
                </section>

                <section className={cx('section')}>
                    <h2>Liên hệ</h2>
                    <p>
                        Nếu bạn có bất kỳ câu hỏi, ý kiến hoặc đề xuất nào, đừng ngần ngại liên hệ với chúng tôi qua
                        email: <a href="mailto:support@hotelbooking.vn">support@hotelbooking.vn</a> hoặc qua số hotline:{' '}
                        <strong>1800 123 456</strong>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
