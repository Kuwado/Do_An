import { getServicesByHotelIdService } from '../services/service/getServicesByHotelIdService.js';

export const getServicesByHotelId = async (req, res) => {
    const hotelId = req.query.hotelId || '';

    try {
        const services = await getServicesByHotelIdService({
            hotelId,
        });

        return res.status(200).json({
            success: true,
            message: `Lấy thành công danh sách dịch vụ của khách sạn ${hotelId}`,
            services,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
