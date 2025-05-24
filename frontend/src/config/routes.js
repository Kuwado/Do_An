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
        profile: '/profile',

        about: '/about',
        vouchers: '/vouchers',
        register: '/register',
        forgotPassword: '/forgot-password',
    },

    staff: {
        dashboard: '/staff',
    },

    admin: {
        login: '/admin/login',
        login2: '/admin/login/second-step',
        dashboard: '/admin',
        hotel: '/hotel-management',
        staffs: '/staffs-management',
        rooms: '/rooms-management',
        room: '/rooms/:id',
        roomList: '/rooms/:id/list',
        services: '/services',
    },

    other: {
        test: '/test',
    },
};

export default routes;
