import models from '../../models/index.js';

export const createServiceBookingService = async (data) => {
    const service_booking = await models.ServiceBooking.create(data);
    return service_booking;
};
