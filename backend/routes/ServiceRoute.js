import express from 'express';
import multer from 'multer';
import {
    createService,
    deleteService,
    getAllServicesByHotelId,
    getServiceBookingsByBookingId,
    getServiceBookingsByHotelId,
    getServiceBookingsHistory,
    getServiceById,
    getServicesByHotelId,
    updateService,
    updateServiceBooking,
} from '../controllers/ServiceController.js';
import { authAdminMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();
const upload = multer();

router.get('/hotel/:hotelId', getServicesByHotelId);
router.get('/booking/:bookingId', getServiceBookingsByBookingId);
router.post('/booking/update/:id', updateServiceBooking);
router.get('/history/:serviceId/:bookingId', getServiceBookingsHistory);

router.get('/hotel/:hotelId/all', getAllServicesByHotelId);
router.get('/:id', getServiceById);
router.post(
    '/create',
    upload.array('images', 10),
    authAdminMiddleware,
    createService,
);
router.post(
    '/update/:id',
    upload.array('images', 10),
    authAdminMiddleware,
    updateService,
);
router.delete('/delete/:id', deleteService);

export default router;
