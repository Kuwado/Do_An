import models from '../models/index.js';
import { createServiceService } from '../services/service/createServiceService.js';
import { deleteServiceService } from '../services/service/deleteServiceService.js';
import { getAllServicesByHotelIdService } from '../services/service/getAllServicesByHotelIdService.js';

import { getServiceBookingsByBookingIdService } from '../services/service/getServiceBookingsByBookingIdService.js';
import { getServiceBookingsByHotelIdService } from '../services/service/getServiceBookingsByHotelIdService.js';
import { getServiceBookingsHistoryService } from '../services/service/getServiceBookingsHistoryService.js';
import { getServiceByIdService } from '../services/service/getServiceByIdService.js';
import { getServicesByHotelIdService } from '../services/service/getServicesByHotelIdService.js';
import { updateServiceBookingService } from '../services/service/updateServiceBookingService.js';
import { updateServiceService } from '../services/service/updateServiceService.js';
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

// CRUD
export const getAllServicesByHotelId = async (req, res) => {
    const hotelId = req.params.hotelId;
    const name = req.query.name;
    const category = req.query.category;
    const sortPrice = req.query.sortPrice;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    try {
        const result = await getAllServicesByHotelIdService({
            hotelId,
            name,
            category,
            sortPrice,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách các dịch vụ của khách sạn',
            services: result.services,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách các dịch vụ của khách sạn thất bại',
            error: error.message,
        });
    }
};

export const getServiceById = async (req, res) => {
    const id = req.params.id;

    try {
        const service = await getServiceByIdService({
            id,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin dịch vụ',
            service,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin dịch vụ thất bại',
            error: error.message,
        });
    }
};

export const createService = async (req, res) => {
    try {
        const serviceData = req.body;
        serviceData.hotel_id = req.user.hotel_id;

        if (req.files) {
            serviceData.images = req.files;
        }

        const service = await createServiceService(serviceData);

        res.status(201).json({
            success: true,
            message: 'Tạo dịch vụ thành công',
            service,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo dịch vụ thất bại',
            error: error.message,
        });
    }
};

export const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updateData = req.body;
        if (req.files) {
            updateData.images = req.files;
        }

        const service = await models.Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy dịch vụ này',
            });
        }

        const result = await updateServiceService(service, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật dịch vụ thành công',
            service: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật dịch vụ thất bại',
            error: error.message,
        });
    }
};

export const deleteService = async (req, res) => {
    const id = req.params.id;

    try {
        await deleteServiceService(id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thành công dịch vụ',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Xóa dịch vụ thất bại',
            error: error.message,
        });
    }
};

//
export const getServiceBookingsByHotelId = async (req, res) => {
    const hotelId = req.params.hotelId;
    const name = req.query.name;
    const status = req.query.status;
    const category = req.query.category;
    const sortDate = req.query.sortDate;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    try {
        const result = await getServiceBookingsByHotelIdService({
            hotelId,
            name,
            status,
            category,
            sortDate,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách dịch vụ booking',
            service_bookings: result.service_bookings,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách dịch vụ booking thất bại',
            error: error.message,
        });
    }
};
