import models from '../models/index.js';

import { getServiceBookingsByBookingIdService } from '../services/service/getServiceBookingsByBookingIdService.js';
import { getServiceBookingsHistoryService } from '../services/service/getServiceBookingsHistoryService.js';
import { getServicesByHotelIdService } from '../services/service/getServicesByHotelIdService.js';
import { updateServiceBookingService } from '../services/service/updateServiceBookingService.js';
import { canApplyVoucher } from '../services/voucher/applyVoucherService.js';

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

export const updateServiceBooking = async (req, res) => {
    try {
        const serviceBookingId = req.params.id;
        const updateData = req.body;

        const serviceBooking = await models.ServiceBooking.findByPk(
            serviceBookingId,
        );

        if (!serviceBooking) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy service booking',
            });
        }

        if (
            updateData.voucher_id &&
            updateData.voucher_id !== serviceBooking.voucher_id
        ) {
            const apply = await canApplyVoucher({
                serviceBookingId,
                voucherId: updateData.voucher_id,
                type: 'service',
            });
            if (!apply) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher áp dụng không hợp lệ',
                });
            }
        }

        const result = await updateServiceBookingService(
            serviceBooking,
            updateData,
        );

        res.status(200).json({
            success: true,
            message: 'Cập nhật service booking thành công',
            service_booking: result,
        });
    } catch (error) {
        console.error('Update service booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getServiceBookingsHistory = async (req, res) => {
    const bookingId = req.params.bookingId;
    const serviceId = req.params.serviceId;

    try {
        const services = await getServiceBookingsHistoryService({
            bookingId,
            serviceId,
        });

        return res.status(200).json({
            success: true,
            message: `Lấy thành công danh sách dịch vụ đã được đặt`,
            services,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
