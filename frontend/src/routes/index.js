import config from '../config';
import pages from '../pages';

const publicRoutes = [
    { path: config.routes.user.home, element: pages.user.home },
    { path: config.routes.user.about, element: pages.user.about },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
