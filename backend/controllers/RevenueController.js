import { getRevenueByHotelService } from '../services/revenue/getRevenueByHotelService.js';

export const getRevenuesByHotel = async (req, res) => {
    const hotelId = req.params.hotelId;
    const start = req.query.start;
    const end = req.query.end;

    try {
        const revenues = await getRevenueByHotelService({
            hotelId,
            start,
            end,
        });

        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách doanh thu',
            revenues,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách doanh thu thất bại',
            error: error.message,
        });
    }
};
