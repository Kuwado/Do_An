import Dashboard from './Dashboard';
import BookingsManagement from './BookingsManegement';
import BookingDetail from './BookingDetail';
import ServiceBookingsManagement from './ServiceBookingsManagement';
import RoomTypesView from './RoomTypesView';
import RoomsView from './RoomsView';

const staff = {
    dashboard: Dashboard,
    bookings: BookingsManagement,
    booking: BookingDetail,
    serviceBookings: ServiceBookingsManagement,
    rooms: RoomTypesView,
    roomList: RoomsView,
};

export default staff;
