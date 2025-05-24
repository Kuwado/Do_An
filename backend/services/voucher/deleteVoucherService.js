import { where } from 'sequelize';
import models from '../../models/index.js';
import { Op } from 'sequelize';

export const deleteVoucherService = async (voucherId) => {
    const voucher = await models.Voucher.findByPk(voucherId);

    if (!voucher) {
        throw new Error('Voucher không tồn tại');
    }

    const voucherInBookings = await models.Booking.findAll({
        where: {
            voucher_id: voucherId,
            status: {
                [Op.in]: ['pending', 'confirmed'],
            },
        },
    });

    if (voucherInBookings.length > 0) {
        throw new Error(`Voucher đang được sử dụng`);
    }

    const voucherInServiceBookings = await models.ServiceBooking.findAll({
        where: {
            voucher_id: voucherId,
            status: {
                [Op.in]: ['pending', 'confirmed'],
            },
        },
    });

    if (voucherInServiceBookings.length > 0) {
        throw new Error(`Voucher đang được sử dụng`);
    }

    await voucher.destroy();
};
