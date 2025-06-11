import cron from 'node-cron';
import models from '../models/index.js';

export const cleanExpiredBookings = () => {
    // Chạy mỗi ngày lúc 01:00 sáng
    cron.schedule('0 1 * * *', async () => {
        const deleted = await models.Booking.destroy({
            where: { status: 'expired' },
        });
        console.log(`[CRON] Đã xóa ${deleted} booking hết hạn.`);
    });
};
