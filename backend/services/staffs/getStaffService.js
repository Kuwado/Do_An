import models from '../../models/index.js';

export const getStaffService = async ({ id = '', hotel = true }) => {
    const include = [];

    if (hotel) {
        include.push({
            model: models.Hotel,
            as: 'hotel',
        });
    }

    const staff = await models.Staff.findByPk(id, {
        include: include.length > 0 ? include : undefined,
    });

    if (!staff) {
        throw new Error(`Nhân viên ${id} không tồn tại`);
    }

    return staff;
};
