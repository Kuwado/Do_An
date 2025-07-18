import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import sequelize from './config/db.js';
import otherRoute from './routes/OtherRoute.js';
import authRoute from './routes/AuthRoute.js';
import hotelRoute from './routes/HotelRoute.js';
import roomRoute from './routes/RoomRoute.js';
import amenityRoute from './routes/AmenityRoute.js';
import voucherRoute from './routes/VoucherRoute.js';
import reviewRoute from './routes/ReviewRoute.js';
import userRoute from './routes/UserRoute.js';
import adminRoute from './routes/AdminRoute.js';
import bookingRoute from './routes/BookingRoute.js';
import serviceRoute from './routes/ServiceRoute.js';
import staffRoute from './routes/StaffRoute.js';
import uploadRoute from './routes/UploadRoute.js';
import revenueRoute from './routes/RevenueRoute.js';
import paymentRoute from './routes/PaymentRoute.js';
import predictRoute from './routes/PredictRoute.js';
import { startCronJobs } from './cronJobs/index.js';
import { collectData } from './cronJobs/collectData.js';
import { trainModelService } from './services/predictServices/trainModelService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

sequelize
    .authenticate()
    .then(() => {
        console.log('Kết nối database thành công');
    })
    .catch((err) => {
        console.error('Không thể kết nối đến database:', err);
    });

// Dùng thư mục /uploads như static file
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api', otherRoute);
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/amenities', amenityRoute);
app.use('/api/vouchers', voucherRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/users', userRoute);
app.use('/api/staffs', staffRoute);
app.use('/api/admins', adminRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/services', serviceRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/revenues', revenueRoute);
app.use('/api/vnpay', paymentRoute);
app.use('/api/predicts', predictRoute);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

startCronJobs();
collectData();
// trainModelService({});
