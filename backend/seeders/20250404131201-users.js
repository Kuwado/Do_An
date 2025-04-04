'use strict';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', 10);

    return queryInterface.bulkInsert('users', [
        {
            username: 'viethoan',
            password: password,
            first_name: 'Việt',
            last_name: 'Hoàn',
            avatar: null,
            phone: '0372689718',
            email: 'viethoan557723@gmail.com',
        },
        {
            username: 'jane_smith',
            password: password,
            first_name: 'Jane',
            last_name: 'Smith',
            avatar: null,
            phone: '0987654321',
            email: 'jane@example.com',
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
}
