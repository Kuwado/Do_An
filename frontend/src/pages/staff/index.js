import Dashboard from './Dashboard';
import BookingsManagement from './BookingsManegement';
import BookingDetail from './BookingDetail';
import ServiceBookingsManagement from './ServiceBookingsManagement';
import RoomTypesView from './RoomTypesView';
import RoomsView from './RoomsView';
import ServicesManagement from './ServicesManagement';
import VouchersManagement from './VouchersManagement';
import Profile from './Profile/Profile';

const staff = {
    dashboard: Dashboard,
    bookings: BookingsManagement,
    booking: BookingDetail,
    serviceBookings: ServiceBookingsManagement,
    rooms: RoomTypesView,
    roomList: RoomsView,
    services: ServicesManagement,
    vouchers: VouchersManagement,
    profile: Profile,
};

export default staff;
