'use strict';

import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    // Lấy tất cả Hotels
    const hotels = await models.Hotel.findAll();

    // Lấy tất cả Amenities và group theo category
    const amenities = await models.Amenity.findAll();

    const amenitiesByCategory = {
        bathroom: [],
        view: [],
        general: [],
    };

    amenities.forEach((amenity) => {
        if (amenitiesByCategory[amenity.category]) {
            amenitiesByCategory[amenity.category].push(amenity);
        }
    });

    const entries = [];

    // Loop qua từng hotel
    for (const hotel of hotels) {
        for (const category in amenitiesByCategory) {
            const categoryAmenities = amenitiesByCategory[category];

            if (categoryAmenities.length > 0) {
                // Random 3 amenity không trùng trong category
                const shuffled = categoryAmenities.sort(
                    () => 0.5 - Math.random(),
                );
                const selectedAmenities = shuffled.slice(0, 3);

                selectedAmenities.forEach((amenity) => {
                    entries.push({
                        hotel_id: hotel.id,
                        amenity_id: amenity.id,
                    });
                });
            }
        }
    }

    // Insert vào bảng hotel_amenities
    if (entries.length > 0) {
        await queryInterface.bulkInsert('hotel_amenities', entries);
    }
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hotel_amenities', null, {});
}
