import models from '../../models/index.js';
import {
    applyVoucherService,
    canApplyVoucher,
} from '../voucher/applyVoucherService.js';

export const updateBookingService = async (booking, updateData) => {
    Object.entries(updateData).forEach(([key, value]) => {
        if (booking[key] !== undefined) {
            booking[key] = value;
        }
    });

    await booking.save();

    return booking;
};
