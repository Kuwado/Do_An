import models from '../../models/index.js';

export const getServicesByHotelIdService = async ({ hotelId = '' }) => {
    let servicesInstance = await models.Service.findAll({
        where: { hotel_id: hotelId },
    });

    if (!servicesInstance || servicesInstance.length === 0) {
        throw new Error(`Khách sạn ${hotelId} chưa có dịch vụ nào`);
    }

    const services = {
        dining: [],
        entertainment: [],
        facilities: [],
        totalDining: 0,
        totalEntertainment: 0,
        totalFacilities: 0,
        totalServices: 0,
    };

    servicesInstance.forEach((sv) => {
        if (services[sv.category]) {
            services[sv.category].push(sv);
        }
    });

    services.totalDining = services.dining.length;
    services.totalEntertainment = services.entertainment.length;
    services.totalFacilities = services.facilities.length;
    services.totalServices =
        services.dining.length +
        services.entertainment.length +
        services.facilities.length;

    return services;
};
