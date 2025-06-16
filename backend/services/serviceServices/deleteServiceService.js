import { where } from 'sequelize';
import models from '../../models/index.js';
import { Op } from 'sequelize';

export const deleteServiceService = async (serviceId) => {
    const service = await models.Service.findByPk(serviceId);

    if (!service) {
        throw new Error('Dịch vụ không tồn tại');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 00:00:00
    const serviceBookings = await models.ServiceBooking.findAll({
        where: {
            service_id: serviceId,
            date: {
                [Op.gte]: today,
            },
            status: {
                [Op.in]: ['pending', 'confirmed'],
            },
        },
    });

    if (serviceBookings.length > 0) {
        throw new Error(`Dịch vụ đang có đơn đặt`);
    }

    await service.destroy();
};
