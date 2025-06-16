import models from '../../models/index.js';

export const getCitiesService = async () => {
    try {
        const cities = await models.Hotel.findAll({
            attributes: [
                [
                    models.Hotel.sequelize.fn(
                        'DISTINCT',
                        models.Hotel.sequelize.col('city'),
                    ),
                    'city',
                ],
            ],
            raw: true,
        });

        return {
            message: 'Lấy thành công danh sách tỉnh',
            cities: cities.map((row) => row.city),
        };
        cities.map((row) => row.city);
    } catch (error) {
        console.error('Error in getCitiesService:', error);

        throw new Error('Lỗi khi lấy danh sách thành phố');
    }
};
