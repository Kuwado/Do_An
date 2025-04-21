import { getVouchersService } from '../services/VoucherService.js';

// export const getHotelById = async (req, res) => {
//     const id = req.params.id;
//     const staff = req.query.staff === 'true';
//     const admin = req.query.admin === 'true';
//     const amenity = req.query.amenity === 'true';
//     const room = req.query.room === 'true';
//     try {
//         const result = await getHotelByIdService(id, {
//             staff,
//             admin,
//             amenity,
//             room,
//         });
//         return res.status(200).json(result);
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };

export const getVouchers = async (req, res) => {
    const hotelId = req.query.hotelId;
    const type = req.query.type;
    const discountType = req.query.discountType;
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await getVouchersService({
            hotelId,
            type,
            discountType,
            status,
            page,
            limit,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
