export const updateServiceBookingService = async (
    serviceBooking,
    updateData,
) => {
    Object.entries(updateData).forEach(([key, value]) => {
        if (serviceBooking[key] !== undefined) {
            serviceBooking[key] = value;
        }
    });

    await serviceBooking.save();

    return serviceBooking;
};
