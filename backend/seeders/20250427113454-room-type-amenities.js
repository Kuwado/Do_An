'use strict';

import models from '../models/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    // Lấy tất cả các khách sạn
    const hotels = await models.Hotel.findAll();

    const entries = [];

    // Lặp qua từng khách sạn
    for (const hotel of hotels) {
        // Lấy tất cả Amenity của khách sạn
        const amenities = await hotel.getAmenities(); // Get amenities của khách sạn

        // Lọc các tiện ích theo category `view` và `bathroom`
        const amenitiesByCategory = {
            bathroom: [],
            view: [],
        };

        amenities.forEach((amenity) => {
            if (amenity.category === 'bathroom') {
                amenitiesByCategory.bathroom.push(amenity);
            } else if (amenity.category === 'view') {
                amenitiesByCategory.view.push(amenity);
            }
        });

        // Random chọn 2 tiện ích từ category `bathroom` và 2 tiện ích từ `view`
        const selectedBathroom = amenitiesByCategory.bathroom
            .sort(() => 0.5 - Math.random())
            .slice(0, 2); // Lấy 2 tiện ích từ category bathroom

        const selectedView = amenitiesByCategory.view
            .sort(() => 0.5 - Math.random())
            .slice(0, 2); // Lấy 2 tiện ích từ category view

        const selectedAmenities = [...selectedBathroom, ...selectedView];

        // Lấy tất cả RoomTypes của khách sạn
        // const roomTypes = await hotel.getRoomTypes();
        const roomTypes = await models.RoomType.findAll({
            where: { hotel_id: hotel.id },
        });

        // Lặp qua từng roomType của khách sạn
        for (const roomType of roomTypes) {
            // Thêm các amenities vào bảng room_type_amenities
            selectedAmenities.forEach((amenity) => {
                entries.push({
                    room_type_id: roomType.id,
                    amenity_id: amenity.id,
                });
            });
        }
    }

    // Insert vào bảng room_type_amenities
    if (entries.length > 0) {
        await queryInterface.bulkInsert('room_type_amenities', entries);
    }
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room_type_amenities', null, {});
}
