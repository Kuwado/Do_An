import models from '../../models/index.js';

export const createVoucherService = async (data) => {
    if (data.code) {
        const voucher = await models.Voucher.findOne({
            where: { code: data.code },
        });
        if (voucher) {
            throw new Error(`Mã voucher đã tồn tại`);
        }
    }

    const voucher = await models.Voucher.create(data);

    return voucher;
};
