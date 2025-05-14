import models from '../../models/index.js';
import { Op } from 'sequelize';

export const applyVoucherService = async ({
    hotelId = '',
    code = '',
    userId = '',
    type = '',
    originalPrice = 0,
}) => {
    const voucher = await models.Voucher.findOne({ where: { code: code } });

    if (!voucher) {
        return {
            susscess: false,
            message: 'Voucher không hợp lệ',
        };
    }

    if (
        voucher.hotel_id !== null &&
        Number(voucher.hotel_id) !== Number(hotelId)
    ) {
        return {
            success: false,
            message: 'Voucher không được sử dụng cho khách sạn này',
        };
    }

    const userVoucher = await models.UserVoucher.findOne({
        where: { user_id: userId, voucher_id: voucher.id },
    });

    if (userVoucher) {
        return {
            susscess: false,
            message: 'Voucher đã được sử dụng',
        };
    }

    if (voucher.type !== type) {
        return {
            susscess: false,
            message: `Voucher này chỉ áp dụng cho ${
                type === 'room' ? 'đặt phòng' : 'dịch vụ'
            }.`,
        };
    }

    if (voucher.status === 'upcoming') {
        return {
            susscess: false,
            message: 'Voucher chưa được kích hoạt',
        };
    } else if (voucher.status === 'end') {
        return {
            susscess: false,
            message: 'Voucher đã hết hạn',
        };
    }

    let final_amount = originalPrice;
    if (voucher.discount_type === 'percent') {
        final_amount = Math.round(
            (originalPrice * (100 - voucher.discount)) / 100,
        );
    } else if (voucher.discount_type === 'fixed') {
        final_amount = originalPrice - voucher.discount;
    }

    if (final_amount < 0) final_amount = 0;

    return {
        susscess: true,
        message: 'Voucher đã được áp dụng thành công',
        final_amount,
        voucher,
    };
};

export const canApplyVoucher = async ({
    bookingId,
    serviceBookingId,
    voucherId,
    type = 'room',
}) => {
    let booking = {};
    if (bookingId) {
        booking = await models.Booking.findByPk(bookingId);

        if (!booking) {
            return false;
        }
    }

    if (serviceBookingId) {
        const serviceBooking = await models.ServiceBooking.findByPk(
            serviceBookingId,
            {
                include: {
                    model: models.Booking,
                    as: 'booking',
                },
            },
        );

        if (!serviceBooking) {
            return false;
        }

        booking = serviceBooking.booking;
    }

    const voucher = await models.Voucher.findByPk(voucherId);

    if (!voucher) {
        return false;
    }

    if (
        voucher.hotel_id !== null &&
        Number(voucher.hotel_id) !== Number(booking.hotel_id)
    ) {
        return false;
    }

    const userVoucher = await models.UserVoucher.findOne({
        where: { user_id: booking.user_id, voucher_id: voucherId },
    });

    if (userVoucher) {
        return false;
    }

    if (voucher.type !== type) {
        return false;
    }

    if (voucher.status === 'upcoming') {
        return false;
    } else if (voucher.status === 'end') {
        return false;
    }

    return true;
};

export const checkVoucher = async ({
    hotelId,
    userId,
    voucherId,
    type = 'room',
}) => {
    const voucher = await models.Voucher.findByPk(voucherId);

    if (!voucher) {
        return false;
    }

    if (
        voucher.hotel_id !== null &&
        Number(voucher.hotel_id) !== Number(hotelId)
    ) {
        return false;
    }

    const userVoucher = await models.UserVoucher.findOne({
        where: { user_id: userId, voucher_id: voucherId },
    });

    if (userVoucher) {
        return false;
    }

    if (voucher.type !== type) {
        return false;
    }

    if (voucher.status === 'upcoming') {
        return false;
    } else if (voucher.status === 'end') {
        return false;
    }

    return true;
};
