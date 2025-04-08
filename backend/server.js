import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import sequelize from './config/db.js';
import authRoute from './routes/AuthRoute.js';
import hotelRoute from './routes/HotelRoute.js';

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
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
