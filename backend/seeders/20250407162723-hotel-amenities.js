'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const hotels = await queryInterface.sequelize.query(
        'SELECT id FROM hotels',
        { type: Sequelize.QueryTypes.SELECT },
    );
    const amenities = await queryInterface.sequelize.query(
        'SELECT id FROM amenities',
        { type: Sequelize.QueryTypes.SELECT },
    );

    const hotelAmenities = [];
    hotels.forEach((hotel) => {
        const randomAmenities = [];
        while (randomAmenities.length < 5) {
            const randomIndex = Math.floor(Math.random() * amenities.length);
            const amenityId = amenities[randomIndex].id;

            // Kiểm tra xem tiện nghi này đã được chọn chưa, nếu chưa thì thêm
            if (!randomAmenities.includes(amenityId)) {
                randomAmenities.push(amenityId);
            }
        }

        randomAmenities.forEach((amenityId) => {
            hotelAmenities.push({
                hotel_id: hotel.id,
                amenity_id: amenityId,
            });
        });
    });

    await queryInterface.bulkInsert('hotel_amenities', hotelAmenities);
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hotel_amenities', null, {});
}
