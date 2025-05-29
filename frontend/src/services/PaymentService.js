import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const handlePayment = async ({ amount, next }) => {
    try {
        const res = await axios.post(`${API_URL}/vnpay/create-payment`, {
            amount,
        });

        if (res.data.success) {
            localStorage.setItem('amount', amount);
            if (next) {
                localStorage.setItem('after_payment_url', next);
            }
            window.location.href = res.data.paymentUrl;
        }
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Đã có lỗi xảy ra. Vui lòng thử lại';

        return { success: false, message: errorMessage };
    }
};
