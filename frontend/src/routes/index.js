import config from '../config';
import pages from '../pages';
import layouts from '../layouts';

const publicRoutes = [
    { path: config.routes.user.login, element: pages.user.login, layout: layouts.other.fullScreen },
    { path: config.routes.user.home, element: pages.user.home, layout: layouts.user.home },
    { path: config.routes.user.hotels, element: pages.user.hotels },
    { path: config.routes.user.hotel, element: pages.user.hotel },
    { path: config.routes.user.booking, element: pages.user.booking },
    { path: config.routes.user.payment, element: pages.user.booking },
    { path: config.routes.user.completed, element: pages.user.booking },
    { path: config.routes.user.bookingList, element: pages.user.bookingList },
    { path: config.routes.user.bookingDetail, element: pages.user.bookingDetail },

    { path: config.routes.user.about, element: pages.user.about },
    { path: config.routes.other.test, element: pages.other.test },

    // Admin
    { path: config.routes.admin.login, element: pages.admin.login, layout: layouts.other.fullScreen },
    { path: config.routes.admin.login2, element: pages.admin.login, layout: layouts.other.fullScreen },

    { path: config.routes.admin.dashboard, element: pages.admin.dashboard, layout: layouts.admin.default },
    { path: config.routes.admin.hotel, element: pages.admin.hotel, layout: layouts.admin.default },
    { path: config.routes.admin.staffs, element: pages.admin.staffs, layout: layouts.admin.default },
    { path: config.routes.admin.rooms, element: pages.admin.rooms, layout: layouts.admin.default },
    { path: config.routes.admin.room, element: pages.admin.room, layout: layouts.admin.default },
    { path: config.routes.admin.roomList, element: pages.admin.room, layout: layouts.admin.default },
    { path: config.routes.admin.services, element: pages.admin.services, layout: layouts.admin.default },
    { path: config.routes.admin.vouchers, element: pages.admin.vouchers, layout: layouts.admin.default },

    { path: config.routes.staff.dashboard, element: pages.staff.dashboard, layout: layouts.admin.default },
    { path: config.routes.staff.bookings, element: pages.staff.bookings, layout: layouts.admin.default },
    { path: config.routes.staff.booking, element: pages.staff.booking, layout: layouts.admin.default },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
