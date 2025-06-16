import models from '../../models/index.js';

export const updateBookingService = async (booking, updateData) => {
    if (updateData.voucher_id && updateData.voucher_id !== booking.voucher_id) {
        const voucher = await models.UserVoucher.create({
            voucher_id: updateData.voucher_id,
            user_id: booking.user_id,
        });
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (booking[key] !== undefined) {
            booking[key] = value;
        }
    });

    await booking.save();

    return booking;
};
