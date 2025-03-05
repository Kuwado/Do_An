import config from '../config';
import pages from '../pages';

const publicRoutes = [
    { path: config.routes.user.home, element: pages.user.home },
    { path: config.routes.user.about, element: pages.user.about },
    { path: config.routes.other.test, element: pages.other.test },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
