'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { env as _env } from 'process';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const basename = _basename(__filename);

const env = _env.NODE_ENV || 'development';
import config from '../config/config.js';
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );
}

readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        import(join(__dirname, file)).then((model) => {
            db[model.name] = model.default(sequelize, DataTypes);
        });
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
