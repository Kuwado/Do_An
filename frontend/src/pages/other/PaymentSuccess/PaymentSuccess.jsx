import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const nextUrl = localStorage.getItem('after_payment_url');
        if (nextUrl) navigate(nextUrl);
    }, []);

    return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
