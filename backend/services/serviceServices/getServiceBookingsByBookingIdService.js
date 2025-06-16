import models from '../../models/index.js';
import { Op } from 'sequelize';

export const getServiceBookingsByBookingIdService = async ({
    bookingId = '',
    status = '',
    type = '',
}) => {
    const whereClause = { booking_id: bookingId };
    if (status) {
        whereClause.status = { [Op.substring]: status };
    }

    let serviceBookingsInstance = await models.ServiceBooking.findAll({
        where: whereClause,
        include: [
            { model: models.Service, as: 'service' },
            { model: models.Voucher, as: 'voucher' },
        ],
        order: [['date', 'desc']],
    });

    if (!serviceBookingsInstance || serviceBookingsInstance.length === 0) {
        return [];
    }

    const uniqueServicesMap = new Map();

    serviceBookingsInstance.forEach((sb) => {
        if (sb.service) {
            if (!type || sb.service.category === type) {
                if (!uniqueServicesMap.has(sb.service.id)) {
                    const clonedService = sb.service.get({ plain: true });
                    clonedService.service_bookings = [];
                    uniqueServicesMap.set(sb.service.id, clonedService);
                }

                const plainSB = sb.get({ plain: true });
                delete plainSB.service;
                uniqueServicesMap
                    .get(sb.service.id)
                    .service_bookings.push(plainSB);
            }
        }
    });

    return Array.from(uniqueServicesMap.values());
};
