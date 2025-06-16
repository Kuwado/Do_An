import models from '../../models/index.js';

export const createServiceBookingService = async (data) => {
    const service_booking = await models.ServiceBooking.create(data);
    if (data.voucher_id) {
        const voucher = await models.UserVoucher.create({
            voucher_id: data.voucher_id,
            user_id: data.user_id,
        });
    }
    return service_booking;
};
