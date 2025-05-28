// services/revenueService.js
import models from '../../models/index.js';
import { Op } from 'sequelize';

export async function getRevenueByHotelService({ hotelId, start, end }) {
    const where = {
        hotel_id: hotelId,
        type: {
            [Op.in]: ['daily', 'monthly', 'yearly'],
        },
    };

    if (start) where.report_date = { [Op.gte]: start };
    if (end) {
        where.report_date = {
            ...(where.report_date || {}),
            [Op.lte]: end,
        };
    }

    const revenues = await models.Revenue.findAll({
        where,
        order: [['report_date', 'ASC']],
    });

    // Tách revenues theo từng type
    const grouped = {
        daily: [],
        monthly: [],
        yearly: [],
    };

    for (const revenue of revenues) {
        if (grouped[revenue.type]) {
            grouped[revenue.type].push(revenue);
        }
    }

    return grouped;
}
