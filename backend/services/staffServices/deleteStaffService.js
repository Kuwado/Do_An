import models from '../../models/index.js';

export const deleteStaffService = async (staffId) => {
    const staff = await models.Staff.findByPk(staffId);

    if (!staff) {
        throw new Error('Nhân viên không tồn tại');
    }

    if (staff.role === 'admin') {
        throw new Error('Bạn không thể xóa quản trị viên');
    }

    await staff.destroy();
};
