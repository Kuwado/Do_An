import { createBookingService } from '../services/booking/createBookingService.js';
import { isRoomAvailable } from '../services/room/isRoomAvailable.js';
import { formatCheckIn, formatCheckOut } from '../utils/formatDateTime.js';

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;

        bookingData.check_in = formatCheckIn(bookingData.check_in);
        bookingData.check_out = formatCheckOut(bookingData.check_out);

        // Kiểm tra phòng có khả dụng không
        const available = await isRoomAvailable(
            bookingData.room_id,
            bookingData.check_in,
            bookingData.check_out,
        );

        if (!available) {
            return res.status(409).json({
                message: 'Phòng này đã được đặt trong khoảng thời gian đó.',
            });
        }

        // Tạo booking
        const result = await createBookingService(bookingData);

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Đặt phòng thất bại!',
            error: error.message,
        });
    }
};
