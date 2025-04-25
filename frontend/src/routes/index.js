import config from '../config';
import pages from '../pages';
import layouts from '../layouts';

const publicRoutes = [
    { path: config.routes.user.login, element: pages.user.login, layout: layouts.other.fullScreen },
    { path: config.routes.user.home, element: pages.user.home, layout: layouts.user.home },
    { path: config.routes.user.about, element: pages.user.about },
    { path: config.routes.user.hotels, element: pages.user.hotels },
    { path: config.routes.other.test, element: pages.other.test },

    { path: config.routes.admin.dashboard, element: pages.admin.dashboard, layout: layouts.admin.default },
    { path: config.routes.staff.dashboard, element: pages.staff.dashboard, layout: layouts.admin.default },
    { path: config.routes.admin.login, element: pages.admin.login, layout: layouts.other.fullScreen },
    { path: config.routes.admin.login2, element: pages.admin.login, layout: layouts.other.fullScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
