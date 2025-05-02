import { expirePendingBookings } from './expirePendingBookings.js';
// import { cleanExpiredBookings } from './cleanExpiredBookings.js';

export const startCronJobs = () => {
    console.log('[CRON] Khởi động cron jobs...');
    expirePendingBookings();
    // cleanExpiredBookings();
};
