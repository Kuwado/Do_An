import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from '@/utils/stringUtil';
import config from '@/config';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const amount = localStorage.getItem('amount');
    const [searchParams] = useSearchParams();
    const isSuccess = searchParams.get('success') === 'true';

    useEffect(() => {
        if (isSuccess) {
            if (amount) toast.success(`Thanh toán thành công ${formatPrice(amount)}`);
            localStorage.setItem('payment_status', 'success');
            const nextUrl = localStorage.getItem('after_payment_url');
            if (nextUrl) navigate(nextUrl);
        } else {
            toast.warning(`Hủy thanh toán`);
            localStorage.setItem('payment_status', 'false');
            const nextUrl = localStorage.getItem('before_payment_url');
            navigate(nextUrl);
        }
    }, []);

    return isSuccess ? toast.success(`Thanh toán thành công ${formatPrice(amount)}`) : toast.warning(`Hủy thanh toán`);
};

export default PaymentSuccess;
