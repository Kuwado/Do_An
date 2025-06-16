import models from '../../models/index.js';

export const getAdminService = async (id) => {
    const admin = await models.Staff.findByPk(id);

    if (!admin) {
        throw new Error(`Admin với id là ${id} không tồn tại`);
    }

    return {
        message: `Lấy thành công thông tin người dùng ${id}`,
        admin,
    };
};
