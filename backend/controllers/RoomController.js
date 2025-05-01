import { getRoomTypesService } from '../services/room/getRoomTypesService.js';

export const getRoomTypes = async (req, res) => {
    const hotelId = req.query.hotel_id;
    const name = req.query.name;
    const checkIn = req.query.check_in;
    const checkOut = req.query.check_out;
    const rooms = req.query.rooms === 'true';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    try {
        const result = await getRoomTypesService({
            hotelId,
            name,
            checkIn,
            checkOut,
            rooms,
            page,
            limit,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
