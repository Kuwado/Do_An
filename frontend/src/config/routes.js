const routes = {
    user: {
        login: '/login',
        home: '/',
        hotels: '/hotels',
        hotel: '/hotels/:id',
        booking: '/hotels/:hotelId/booking/:roomTypeId',
        payment: '/hotels/:hotelId/payment',
        confirm: '/hotels/:hotelId/booking-confirm/:bookingId',

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
