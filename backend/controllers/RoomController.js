import models from '../models/index.js';
import { createRoomService } from '../services/roomServices/createRoomService.js';
import { createRoomTypeService } from '../services/roomServices/createRoomTypeService.js';
import { deleteRoomService } from '../services/roomServices/deleteRoomService.js';
import { deleteRoomTypeService } from '../services/roomServices/deleteRoomTypeService.js';
import { getRoomService } from '../services/roomServices/getRoomService.js';
import { getRoomsService } from '../services/roomServices/getRoomsService.js';
import { getRoomTypeService } from '../services/roomServices/getRoomTypeService.js';
import { getRoomTypesService } from '../services/roomServices/getRoomTypesService.js';
import { updateRoomService } from '../services/roomServices/updateRoomService.js';
import { updateRoomTypeService } from '../services/roomServices/updateRoomTypeService.js';

export const getRoomTypes = async (req, res) => {
    const hotelId = req.query.hotelId;
    const name = req.query.name;
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    const rooms = req.query.rooms === 'true';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

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
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách các loại phòng khách sạn',
            room_types: result.room_types,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách các loại phòng khách sạn thất bại',
            error: error.message,
        });
    }
};

export const getRooms = async (req, res) => {
    const roomTypeId = req.query.roomTypeId;
    const number = req.query.number;
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    const filter = req.query.filter;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await getRoomsService({
            roomTypeId,
            number,
            checkIn,
            checkOut,
            filter,
            page,
            limit,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công danh sách phòng khách sạn',
            rooms: result.rooms,
            totalItems: result.totalItems,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy danh sách phòng khách sạn thất bại',
            error: error.message,
        });
    }
};

export const getRoomTypeById = async (req, res) => {
    const id = req.params.id;
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    const rooms = req.query.rooms === 'true';

    try {
        const room_type = await getRoomTypeService({
            id,
            checkIn,
            checkOut,
            rooms,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin loại phòng',
            room_type,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin loại phòng thất bại',
            error: error.message,
        });
    }
};

export const getRoomById = async (req, res) => {
    const id = req.params.id;

    try {
        const room_type = await getRoomService({
            id,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy thành công thông tin phòng',
            room_type,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy thông tin phòng thất bại',
            error: error.message,
        });
    }
};

export const createRoomType = async (req, res) => {
    try {
        const roomTypeData = req.body;
        roomTypeData.hotel_id = req.user.hotel_id;

        if (req.files) {
            roomTypeData.images = req.files;
        }

        const room_type = await createRoomTypeService(roomTypeData);

        res.status(201).json({
            success: true,
            message: 'Tạo loại phòng thành công',
            room_type,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo loại phòng thất bại',
            error: error.message,
        });
    }
};

export const createRoom = async (req, res) => {
    try {
        const roomData = req.body;
        roomData.hotel_id = req.user.hotel_id;

        const room = await createRoomService(roomData);

        res.status(201).json({
            success: true,
            message: 'Tạo phòng thành công',
            room,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Tạo phòng thất bại',
            error: error.message,
        });
    }
};

export const updateRoomType = async (req, res) => {
    try {
        const roomTypeId = req.params.id;
        const updateData = req.body;
        if (req.files) {
            updateData.images = req.files;
        }

        const roomType = await models.RoomType.findByPk(roomTypeId);
        if (!roomType) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy loại phòng này',
            });
        }

        const result = await updateRoomTypeService(roomType, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật loại phòng thành công',
            room_type: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật loại phòng thất bại',
            error: error.message,
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const updateData = req.body;
        if (req.files) {
            updateData.images = req.files;
        }

        const room = await models.Room.findByPk(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phòng này',
            });
        }

        const result = await updateRoomService(room, updateData);

        res.status(200).json({
            success: true,
            message: 'Cập nhật phòng thành công',
            room: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Cập nhật phòng thất bại',
            error: error.message,
        });
    }
};

export const deleteRoomType = async (req, res) => {
    const id = req.params.id;

    try {
        await deleteRoomTypeService(id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thành công loại phòng',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Xóa loại phòng thất bại',
            error: error.message,
        });
    }
};

export const deleteRoom = async (req, res) => {
    const id = req.params.id;

    try {
        await deleteRoomService(id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thành công phòng',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Xóa phòng thất bại',
            error: error.message,
        });
    }
};
