import { getServiceBookingsByBookingIdService } from '../services/service/getServiceBookingsByBookingIdService.js';
import { getServicesByHotelIdService } from '../services/service/getServicesByHotelIdService.js';

export const getServicesByHotelId = async (req, res) => {
    const hotelId = req.params.hotelId;

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

export const getServiceBookingsByBookingId = async (req, res) => {
    const bookingId = req.params.bookingId;
    const status = req.query.status || '';
    const type = req.query.type || '';

    try {
        const services = await getServiceBookingsByBookingIdService({
            bookingId,
            status,
            type,
        });

        return res.status(200).json({
            success: true,
            message: `Lấy thành công danh sách dịch vụ của booking ${bookingId}`,
            services,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
