import models from '../models/index.js';
import { Op } from 'sequelize';
import cron from 'node-cron';

export const updateVoucherStatus = () => {
    // Chạy mỗi ngày lúc 00:00
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Cập nhật "upcoming" — chưa tới ngày bắt đầu
            await models.Voucher.update(
                { status: 'upcoming' },
                {
                    where: {
                        start_date: { [Op.gt]: today },
                    },
                },
            );

            // Cập nhật "active" — trong thời gian hiệu lực
            await models.Voucher.update(
                { status: 'active' },
                {
                    where: {
                        start_date: { [Op.lte]: today },
                        end_date: { [Op.gte]: today },
                    },
                },
            );

            // Cập nhật "end" — đã quá hạn
            await models.Voucher.update(
                { status: 'end' },
                {
                    where: {
                        end_date: { [Op.lt]: today },
                    },
                },
            );

            console.log('Trạng thái voucher đã cập nhật thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái voucher:', error);
        }
    });
};
