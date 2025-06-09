import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from '@/utils/stringUtil';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const amount = localStorage.getItem('amount');

    useEffect(() => {
        if (amount) toast.success(`Thanh toán thành công ${formatPrice(amount)}`);
        localStorage.setItem('payment_status', 'success');
        const nextUrl = localStorage.getItem('after_payment_url');
        if (nextUrl) navigate(nextUrl);
    }, []);

    return toast.success(`Thanh toán thành công ${formatPrice(amount)}`);
};

export default PaymentSuccess;
