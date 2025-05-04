import models from '../models/index.js';
import { createBookingService } from '../services/booking/createBookingService.js';
import { createServiceBookingService } from '../services/booking/createServiceBookingService.js';
import { getBookingsByUserIdService } from '../services/booking/getBookingsByUserIdService.js';
import { getBookingService } from '../services/booking/getBookingService.js';
import { updateBookingService } from '../services/booking/updateBookingService.js';
import {
    getRoomAvailableIds,
    isRoomAvailable,
} from '../services/room/roomAvailable.js';
import {
    canApplyVoucher,
    checkVoucher,
} from '../services/voucher/applyVoucherService.js';
import { formatCheckIn, formatCheckOut } from '../utils/formatDateTime.js';

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;

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

        if (bookingData.voucher_id) {
            const apply = await checkVoucher({
                hotelId: bookingData.hotel_id,
                userId: req.user.id,
                voucherId: bookingData.voucher_id,
                type: 'room',
            });
            if (!apply) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher áp dụng không hợp lệ',
                });
            }
        }

        // Tạo booking
        bookingData.room_id = availableRoomIds[0];
        bookingData.user_id = req.user.id;
        const booking = await createBookingService(bookingData);

        res.status(201).json({
            success: true,
            message: 'Tạo thành công booking',
            booking,
        });
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
        serviceBookingData.user_id = req.user.id;

        const booking = await models.Booking.findByPk(
            serviceBookingData.booking_id,
        );
        if (!booking) {
            return res.status(400).json({
                success: false,
                message: `Booking ${serviceBookingData.booking_id} không tồn tại`,
            });
        }

        if (serviceBookingData.voucher_id) {
            const apply = await checkVoucher({
                hotelId: booking.hotel_id,
                userId: req.user.id,
                voucherId: serviceBookingData.voucher_id,
                type: 'service',
            });
            if (!apply) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher áp dụng không hợp lệ',
                });
            }
        }
        // Tạo booking
        const service_booking = await createServiceBookingService(
            serviceBookingData,
        );

        res.status(201).json({
            success: true,
            message: 'Tạo thành công service booking',
            service_booking,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Đặt dịch vụ thất bại!',
            error: error.message,
        });
    }
};

export const getBookingById = async (req, res) => {
    const id = req.params.id;
    const user = req.query.user ? req.query.user === 'true' : true;
    const hotel = req.query.hotel ? req.query.hotel === 'true' : true;
    const room = req.query.room ? req.query.room === 'true' : true;
    const services = req.query.services ? req.query.services === 'true' : true;
    const voucher = req.query.voucher ? req.query.voucher === 'true' : true;

    const booking = await models.Booking.findByPk(id);
    if (!booking) {
        return res
            .status(400)
            .json({ message: `Không tìm thấy booking ${id}` });
    }
    if (req.user.id != booking.user_id) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập' });
    }

    try {
        const booking = await getBookingService({
            id,
            hotel,
            user,
            room,
            services,
            voucher,
        });

        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin booking',
            booking,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const updateData = req.body;

        const booking = await models.Booking.findByPk(bookingId);
        if (!booking) {
            return res
                .status(404)
                .json({ success: false, message: 'Không tìm thấy booking' });
        }

        if (
            updateData.voucher_id &&
            updateData.voucher_id !== booking.voucher_id
        ) {
            const apply = await canApplyVoucher({
                bookingId,
                voucherId: updateData.voucher_id,
                type: 'room',
            });
            if (!apply) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher áp dụng không hợp lệ',
                });
            }
        }

        const result = await updateBookingService(booking, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật booking thành công',
            booking: result,
        });
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBookingsByUserId = async (req, res) => {
    const userId = req.params.id;
    const hotel = req.query.hotel ? req.query.hotel === 'true' : true;
    const room = req.query.room ? req.query.room === 'true' : true;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (req.user.id != userId) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập' });
    }

    try {
        const result = await getBookingsByUserIdService({
            userId,
            hotel,
            room,
            page,
            limit,
        });

        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách booking của người dùng',
            bookings: result.bookings,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
