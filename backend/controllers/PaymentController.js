import crypto from 'crypto';
import qs from 'qs';
import moment from 'moment';
import vnpConfig from '../config/vnpay.js';

export const createPaymentUrl = (req, res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const orderId = moment(date).format('DDHHmmss');

        const ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.connection?.socket?.remoteAddress;

        const { amount, bankCode, language } = req.body;
        const locale = language || 'vn';

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnpConfig.vnp_TmnCode,
            vnp_Locale: locale,
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toan cho ma GD: ${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100, // nhân 100 vì VNPAY yêu cầu đơn vị là đồng
            vnp_ReturnUrl: vnpConfig.vnp_ReturnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', vnpConfig.vnp_HashSecret);
        const signed = hmac
            .update(Buffer.from(signData, 'utf-8'))
            .digest('hex');

        vnp_Params['vnp_SecureHash'] = signed;

        const paymentUrl = `${vnpConfig.vnp_Url}?${qs.stringify(vnp_Params, {
            encode: false,
        })}`;

        return res.status(200).json({
            success: true,
            message: 'Thành công',
            paymentUrl,
        });
    } catch (err) {
        console.error('Error creating VNPAY payment URL:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const vnpayReturn = async (req, res) => {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // 1. Sort params alphabetically
    vnp_Params = sortObject(vnp_Params);

    // 2. Build signData string without encoding values
    const signData = qs.stringify(vnp_Params, { encode: false });

    // 3. Create signature
    const hmac = crypto.createHmac('sha512', vnpConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // 4. Verify signature
    if (secureHash === signed) {
        const isSuccess = vnp_Params['vnp_ResponseCode'] === '00';
        return res.redirect(`${nextUrl}?success=${isSuccess}`);
    } else {
        return res.status(400).send('Sai chữ ký (Invalid Signature)');
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+',
        );
    }
    return sorted;
}
