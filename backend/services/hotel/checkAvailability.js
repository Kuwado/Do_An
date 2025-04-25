import { sequelize } from '../../models/index.js';

export const getAvailableHotelIds = async ({
    check_in,
    check_out,
    quantity,
    people,
}) => {
    const [results] = await sequelize.query(
        `
        SELECT DISTINCT h.id
        FROM Hotels h
        JOIN RoomTypes rt ON rt.hotel_id = h.id
        JOIN Rooms r ON r.room_type_id = rt.id
        LEFT JOIN Bookings b ON b.room_id = r.id
            AND b.check_in < :check_out
            AND b.check_out > :check_in
        GROUP BY h.id, r.id, r.quantity
        HAVING (r.quantity - COALESCE(SUM(b.quantity), 0)) >= :quantity
    `,
        {
            replacements: { check_in, check_out, quantity },
        },
    );

    return results.map((h) => h.id);
};
