import Sequelize from 'sequelize';

export const sequelize = new Sequelize('TaskManagementDB', 'postgres', 'imKaushal@5699', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
})