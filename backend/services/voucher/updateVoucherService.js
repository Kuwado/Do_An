import models from '../../models/index.js';

export const updateVoucherService = async (voucher, updateData) => {
    if (updateData.code !== voucher.code) {
        const existed = await models.Voucher.findOne({
            where: { code: updateData.code },
        });
        if (existed) {
            throw new Error(`Mã voucher đã tồn tại`);
        }
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (voucher[key] !== undefined) {
            voucher[key] = value;
        }
    });

    await voucher.save();

    return voucher;
};
