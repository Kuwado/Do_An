import config from '../config';
import pages from '../pages';
import layouts from '../layouts';

const publicRoutes = [
    { path: config.routes.user.login, element: pages.user.login, layout: layouts.other.fullScreen },
    { path: config.routes.user.home, element: pages.user.home },
    { path: config.routes.user.about, element: pages.user.about },
    { path: config.routes.other.test, element: pages.other.test },

    { path: config.routes.admin.dashboard, element: pages.admin.dashboard, layout: layouts.admin.default },
    { path: config.routes.staff.dashboard, element: pages.staff.dashboard, layout: layouts.admin.default },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
