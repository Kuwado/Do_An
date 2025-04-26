const routes = {
    user: {
        home: '/',
        hotels: '/hotels',
        login: '/login',
        about: '/about',
        vouchers: '/vouchers',
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
