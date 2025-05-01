import Hotel from './Hotel.js';
import Staff from './Staff.js';
import User from './User.js';
import Amenity from './Amenity.js';
import HotelAmenity from './HotelAmenity.js';
import RoomType from './RoomType.js';
import Room from './Room.js';
import Voucher from './Voucher.js';
import Service from './Service.js';
import RoomTypeAmenity from './RoomTypeAmenity.js';
import Review from './Review.js';
import Booking from './Booking.js';
import UserVoucher from './UserVoucher.js';
import ServiceBooking from './ServiceBooking.js';

const models = {
    Hotel,
    Staff,
    User,
    Amenity,
    HotelAmenity,
    RoomType,
    Room,
    Voucher,
    Service,
    RoomTypeAmenity,
    Review,
    Booking,
    ServiceBooking,
    UserVoucher,
};

// Gọi associate sau khi các model đã có mặt
Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

export default models;
