import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getServiceBookingsHistoryService = async ({
    bookingId = '',
    serviceId = '',
}) => {
    const serviceBookingsInstance = await models.ServiceBooking.findAll({
        where: {
            booking_id: bookingId,
            service_id: serviceId,
            status: {
                [Op.in]: ['confirmed', 'pending'],
            },
        },
        order: [['date', 'desc']],
    });

    if (!serviceBookingsInstance || serviceBookingsInstance.length === 0) {
        return [];
    }

    return serviceBookingsInstance;
};
