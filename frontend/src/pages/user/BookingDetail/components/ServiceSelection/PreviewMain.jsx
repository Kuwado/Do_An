import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ServiceSelection.module.scss';
import { QuantityInput, DateInput, Input } from '@/components/Input';
import { Button } from '@/components/Button';
import FullScreenSlider from '@/constants/Slider/FullScreen/FullScreenSlider';
import images from '@/assets/images';
import { changeToDate } from '@/utils/dateUtil';
import { checkVoucher } from '@/services/VoucherService';
import { toast } from 'react-toastify';

const IMAGES = [images.service, images.service, images.service, images.service, images.service];

const cx = classNames.bind(styles);

const PreviewMain = ({
    chosenService = {},
    booking,
    quantity,
    setQuantity,
    dateType,
    setDateType,
    date,
    setDate,
    total,
    setFinalTotal,
    setVoucher,
    handleBookService,
}) => {
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(null);

    const applyVoucher = async () => {
        const res = await checkVoucher({
            hotelId: booking.hotel.id,
            code: code,
            type: 'service',
            originalPrice: total,
        });

        if (res.success) {
            setVoucher(res.voucher);
            setFinalTotal(res.final_amount);
            setCodeError(null);
            toast.success('Áp dụng voucher thành công');
        } else {
            setCodeError(res.message);
            setVoucher(null);
            toast.error(res.message);
        }
    };

    return (
        <div className={cx('preview-main')}>
            {chosenService && Object.keys(chosenService).length > 0 ? (
                <>
                    <div className={cx('preview-title')}>{chosenService.name}</div>

                    <div className={cx('preview-content')}>
                        <div className={cx('images')}>
                            <FullScreenSlider
                                className="hover card"
                                images={chosenService.images || IMAGES}
                                height="100%"
                                autoPlay={false}
                            />
                        </div>

                        <div className={cx('date-type')}>
                            <label>
                                <input
                                    type="radio"
                                    name="date-type"
                                    value="one"
                                    onChange={(e) => setDateType(e.target.value)}
                                    checked={dateType === 'one'}
                                />
                                Đặt dịch vụ 1 ngày
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="date-type"
                                    value="all"
                                    onChange={(e) => setDateType(e.target.value)}
                                    checked={dateType === 'all'}
                                />
                                Đặt dịch vụ tất cả các ngày
                            </label>
                        </div>

                        <QuantityInput value={quantity} setValue={setQuantity} label="Số lượng" required />

                        {dateType === 'one' && (
                            <>
                                <DateInput
                                    value={date}
                                    setValue={setDate}
                                    label="Ngày đặt"
                                    min={changeToDate(booking.check_in)}
                                    max={changeToDate(booking.check_out)}
                                    required
                                />

                                <div className={cx('voucher')}>
                                    <Input className={cx('input')} value={code} setValue={setCode} label="Voucher" />
                                    <Button className={cx('btn')} primaryBorder curved small onClick={applyVoucher}>
                                        Áp dụng
                                    </Button>
                                </div>
                            </>
                        )}

                        <div className={cx('add-btn')}>
                            <Button secondary curved onClick={handleBookService}>
                                Thêm dịch vụ
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('empty-text')}>
                    Bạn chưa chọn dịch vụ nào. <br />
                    Vui lòng chọn dịch vụ bạn muốn đặt
                </div>
            )}
        </div>
    );
};

export default PreviewMain;
