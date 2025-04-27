'use strict';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', 10);

    return queryInterface.bulkInsert('users', [
        {
            username: 'user1',
            password: password,
            first_name: 'Jane',
            last_name: 'Smith',
            avatar: null,
            phone: '0987654321',
            email: 'jane@gmail.com',
        },
        {
            username: 'user2',
            password: password,
            first_name: 'Kanashi',
            last_name: 'Kuwado',
            avatar: null,
            phone: '0987454321',
            email: 'kuwado@gmail.com',
        },
        {
            username: 'user3',
            password: password,
            first_name: 'Tung Tung',
            last_name: 'Sahur',
            avatar: null,
            phone: '0982654321',
            email: 'ttsahur@gmail.com',
        },
        {
            username: 'viethoan',
            password: password,
            first_name: 'Việt',
            last_name: 'Hoàn',
            avatar: null,
            phone: '0372689718',
            email: 'viethoan557723@gmail.com',
        },
    ]);
}
export async function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
}
