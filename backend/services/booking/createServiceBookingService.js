import models from '../../models/index.js';

export const createServiceBookingService = async (data) => {
    const service_booking = await models.ServiceBooking.create(data);
    return { message: 'Đặt dịch vụ thành công', service_booking };
};
