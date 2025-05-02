import { createBookingService } from '../services/booking/createBookingService.js';
import { createServiceBookingService } from '../services/booking/createServiceBookingService.js';
import {
    getRoomAvailableIds,
    isRoomAvailable,
} from '../services/room/roomAvailable.js';
import { formatCheckIn, formatCheckOut } from '../utils/formatDateTime.js';

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        // console.log(req);

        bookingData.check_in = formatCheckIn(bookingData.check_in);
        bookingData.check_out = formatCheckOut(bookingData.check_out);

        // Kiểm tra phòng có khả dụng không
        const availableRoomIds = await getRoomAvailableIds(
            bookingData.room_type_id,
            bookingData.check_in,
            bookingData.check_out,
        );

        if (availableRoomIds.length === 0) {
            return res.status(409).json({
                message: 'Loại phòng này đã được đặt hết',
            });
        }

        // Tạo booking
        bookingData.room_id = availableRoomIds[0];
        bookingData.user_id = req.user.id;
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

export const createServiceBooking = async (req, res) => {
    try {
        const serviceBookingData = req.body;

        // Tạo booking
        const result = await createServiceBookingService(serviceBookingData);

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Đặt dịch vụ thất bại!',
            error: error.message,
        });
    }
};
