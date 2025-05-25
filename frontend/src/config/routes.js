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
        dashboard: '/admin/dashboard',
        hotel: '/admin/hotel-management',
        staffs: '/admin/staffs-management',
        rooms: '/admin/rooms-management',
        room: '/admin/rooms/:id',
        roomList: '/admin/rooms/:id/list',
        services: '/admin/services',
        vouchers: '/admin/vouchers',
    },

    other: {
        test: '/test',
    },
};

export default routes;
