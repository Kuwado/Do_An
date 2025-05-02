import cron from 'node-cron';
import models from '../models/index.js';
import { Op } from 'sequelize';

export const expirePendingBookings = () => {
    cron.schedule('*/5 * * * *', async () => {
        const now = new Date();
        const updated = await models.Booking.update(
            { status: 'expired' },
            {
                where: {
                    status: 'pending',
                    expired_at: { [Op.lt]: now },
                },
            },
        );
        console.log(`[CRON] Cập nhật ${updated[0]} booking hết hạn.`);
    });
};
