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
        dashboard: '/staff/dashboard',
        profile: '/staff/profile',
        bookings: '/staff/bookings',
        booking: '/staff/bookings/:id',
        serviceBookings: '/staff/service-bookings',
        rooms: '/staff/rooms-management',
        room: '/staff/rooms-management/:id',
        roomList: '/staff/rooms-management/:id/list',
        services: '/staff/services',
        vouchers: '/staff/vouchers',
    },

    admin: {
        login: '/admin/login',
        login2: '/admin/login/second-step',
        profile: '/admin/profile',
        dashboard: '/admin/dashboard',
        hotel: '/admin/hotel-management',
        staffs: '/admin/staffs-management',
        rooms: '/admin/rooms-management',
        room: '/admin/rooms-management/:id',
        roomList: '/admin/rooms-management/:id/list',
        services: '/admin/services',
        vouchers: '/admin/vouchers',
        bookings: '/admin/bookings',
        booking: '/admin/bookings/:id',
        serviceBookings: '/admin/service-bookings',
        revenue: '/admin/revenue',
        predict: '/admin/predict',
    },

    other: {
        test: '/test',
        paymentSuccess: '/payment-success',
    },
};

export default routes;
