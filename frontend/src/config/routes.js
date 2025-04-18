const routes = {
    user: {
        home: '/',
        about: '/about',
        hotels: '/hotels',
        vouchers: '/vouchers',
        login: '/login',
        register: '/register',
        forgotPassword: '/forgot-password',
    },

    staff: {
        dashboard: '/staff',
    },

    admin: {
        dashboard: '/admin',
        login: '/admin/login',
        login2: '/admin/login/second-step',
    },

    other: {
        test: '/test',
    },
};

export default routes;
