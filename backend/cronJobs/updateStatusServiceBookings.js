import cron from 'node-cron';
import models from '../models/index.js';
import { Op } from 'sequelize';

export const updateStatusServiceBookings = () => {
    // Chạy mỗi ngày lúc 00:10 sáng
    cron.schedule('10 0 * * *', async () => {
        const now = new Date();
        const updated = await models.ServiceBooking.update(
            { status: 'completed' },
            {
                where: {
                    status: 'confirmed',
                    date: { [Op.lt]: now },
                },
            },
        );
        console.log(
            `[CRON] Cập nhật ${updated[0]} service booking sang completed.`,
        );
    });
};
