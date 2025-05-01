import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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

// Routes
app.use('/api', otherRoute);
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/amenities', amenityRoute);
app.use('/api/vouchers', voucherRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/users', userRoute);
app.use('/api/admins', adminRoute);
app.use('/api/bookings', bookingRoute);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
