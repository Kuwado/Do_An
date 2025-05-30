'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.addColumn('hotels', 'predict', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    });

    await queryInterface.addColumn('hotels', 'lat', {
        type: Sequelize.DECIMAL(10, 7), // Độ chính xác cho vĩ độ
        allowNull: true,
    });

    await queryInterface.addColumn('hotels', 'lon', {
        type: Sequelize.DECIMAL(10, 7), // Độ chính xác cho kinh độ
        allowNull: true,
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('hotels', 'predict');
    await queryInterface.removeColumn('hotels', 'lat');
    await queryInterface.removeColumn('hotels', 'lon');
}
