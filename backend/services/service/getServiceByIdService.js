import models from '../../models/index.js';

export const getServiceByIdService = async ({ id }) => {
    const service = await models.Service.findByPk(id);

    if (!service) {
        throw new Error(`Dịch vụ với id là ${id} không tồn tại`);
    }

    return service;
};
