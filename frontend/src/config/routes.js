const routes = {
    user: {
        login: '/login',
        home: '/',
        hotels: '/hotels',
        hotel: '/hotels/:id',
        booking: '/hotels/:hotelId/booking/:roomTypeId',
        payment: '/hotels/:hotelId/payment',
        completed: '/hotels/:hotelId/booking-completed',
        bookingList: '/bookings',
        bookingDetail: '/bookings/:id',

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
