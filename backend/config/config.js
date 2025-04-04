import dotenv from 'dotenv';
dotenv.config();

console.log('DB_USER: ', process.env.DB_USER); // Debug: Kiểm tra giá trị các biến môi trường
console.log('DB_PASS: ', process.env.DB_PASS);
console.log('DB_NAME: ', process.env.DB_NAME);
console.log('DB_HOST: ', process.env.DB_HOST);

export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'database_test',
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'database_production',
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
