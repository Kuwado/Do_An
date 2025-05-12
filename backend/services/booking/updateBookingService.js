export const updateBookingService = async (booking, updateData) => {
    Object.entries(updateData).forEach(([key, value]) => {
        if (booking[key] !== undefined) {
            booking[key] = value;
        }
    });

    await booking.save();

    return booking;
};
