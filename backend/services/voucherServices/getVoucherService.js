import models from '../../models/index.js';

export const getVoucherService = async ({ id }) => {
    const voucher = await models.Voucher.findByPk(id);

    if (!voucher) {
        throw new Error(`Voucher với id là ${id} không tồn tại`);
    }

    return voucher;
};
