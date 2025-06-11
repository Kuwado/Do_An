import { expirePendingBookings } from './expirePendingBookings.js';
import { updateHotelRevenue } from './updateHotelRevenue.js';
import { updateStatusServiceBookings } from './updateStatusServiceBookings.js';
import { updateVoucherStatus } from './updateVoucherStatus.js';
import { cleanExpiredBookings } from './cleanExpiredBookings.js';

export const startCronJobs = () => {
    console.log('[CRON] Khởi động cron jobs...');
    expirePendingBookings();
    updateVoucherStatus();
    updateHotelRevenue();
    updateStatusServiceBookings();
    cleanExpiredBookings();
};
