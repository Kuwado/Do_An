import config from '../config';
import pages from '../pages';
import layouts from '../layouts';

const publicRoutes = [
    { path: config.routes.user.login, element: pages.user.login, layout: layouts.other.fullScreen },
    { path: config.routes.user.register, element: pages.user.register, layout: layouts.other.fullScreen },
    { path: config.routes.user.home, element: pages.user.home, layout: layouts.user.home },
    { path: config.routes.user.hotels, element: pages.user.hotels },
    { path: config.routes.user.hotel, element: pages.user.hotel },

    { path: config.routes.user.about, element: pages.user.about },
    { path: config.routes.other.paymentSuccess, element: pages.other.paymentSuccess },

    // Admin
    { path: config.routes.admin.login, element: pages.admin.login, layout: layouts.other.fullScreen },
    { path: config.routes.admin.login2, element: pages.admin.login, layout: layouts.other.fullScreen },
];

const privateRoutes = [
    // User
    { path: config.routes.user.booking, element: pages.user.booking },
    { path: config.routes.user.payment, element: pages.user.booking },
    { path: config.routes.user.completed, element: pages.user.booking },
    { path: config.routes.user.bookingList, element: pages.user.bookingList },
    { path: config.routes.user.bookingDetail, element: pages.user.bookingDetail },
    { path: config.routes.user.profile, element: pages.user.profile },

    // Admin
    { path: config.routes.admin.profile, element: pages.admin.profile, layout: layouts.admin.default, role: 'admin' },
    {
        path: config.routes.admin.dashboard,
        element: pages.admin.dashboard,
        layout: layouts.admin.default,
        role: 'admin',
    },
    { path: config.routes.admin.hotel, element: pages.admin.hotel, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.staffs, element: pages.admin.staffs, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.rooms, element: pages.admin.rooms, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.room, element: pages.admin.room, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.roomList, element: pages.admin.room, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.services, element: pages.admin.services, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.vouchers, element: pages.admin.vouchers, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.bookings, element: pages.admin.bookings, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.booking, element: pages.admin.booking, layout: layouts.admin.default, role: 'admin' },
    {
        path: config.routes.admin.serviceBookings,
        element: pages.admin.serviceBookings,
        layout: layouts.admin.default,
        role: 'admin',
    },
    { path: config.routes.admin.revenue, element: pages.admin.revenue, layout: layouts.admin.default, role: 'admin' },
    { path: config.routes.admin.predict, element: pages.admin.predict, layout: layouts.admin.default, role: 'admin' },

    // Staff
    { path: config.routes.staff.profile, element: pages.staff.profile, layout: layouts.admin.default, role: 'staff' },
    {
        path: config.routes.staff.dashboard,
        element: pages.staff.dashboard,
        layout: layouts.admin.default,
        role: 'staff',
    },
    { path: config.routes.staff.bookings, element: pages.staff.bookings, layout: layouts.admin.default, role: 'staff' },
    { path: config.routes.staff.booking, element: pages.staff.booking, layout: layouts.admin.default, role: 'staff' },
    {
        path: config.routes.staff.serviceBookings,
        element: pages.staff.serviceBookings,
        layout: layouts.admin.default,
        role: 'staff',
    },
    { path: config.routes.staff.rooms, element: pages.staff.rooms, layout: layouts.admin.default, role: 'staff' },
    { path: config.routes.staff.roomList, element: pages.staff.roomList, layout: layouts.admin.default, role: 'staff' },
    { path: config.routes.staff.services, element: pages.staff.services, layout: layouts.admin.default, role: 'staff' },
    { path: config.routes.staff.vouchers, element: pages.staff.vouchers, layout: layouts.admin.default, role: 'staff' },
];

export { publicRoutes, privateRoutes };
