import Dashboard from './Dashboard';
import Login from './Login';
import Hotel from './Hotel';
import StaffsManagement from './StaffsManagement';
import RoomsManagement from './RoomsManagement';
import Room from './Room';
import ServicesManagement from './ServicesManagement';
import VouchersManagement from './VouchersManagement';
import Profile from './Profile';
import Revenue from './Revenue';
import BookingsManagement from './BookingsManegement';
import BookingDetail from './BookingDetail';
import Predict from './Predict';
import ServiceBookingsManagement from './ServiceBookingsManagement/ServiceBookingsManagement';

const admin = {
    login: Login,
    profile: Profile,
    dashboard: Dashboard,
    hotel: Hotel,
    staffs: StaffsManagement,
    rooms: RoomsManagement,
    room: Room,
    services: ServicesManagement,
    vouchers: VouchersManagement,
    bookings: BookingsManagement,
    booking: BookingDetail,
    serviceBookings: ServiceBookingsManagement,
    revenue: Revenue,
    predict: Predict,
};

export default admin;
