import models from '../../models/index.js';

export const getServiceBookingsHistoryService = async ({
    bookingId = '',
    serviceId = '',
}) => {
    const serviceBookingsInstance = await models.ServiceBooking.findAll({
        where: { booking_id: bookingId, service_id: serviceId },
        order: [['date', 'desc']],
    });

    if (!serviceBookingsInstance || serviceBookingsInstance.length === 0) {
        throw new Error(`Bạn chưa đặt dịch vụ này`);
    }

    return serviceBookingsInstance;
};
