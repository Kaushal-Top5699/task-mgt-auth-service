import Sequelize from 'sequelize';

export const sequelize = new Sequelize('task_auth_service_db', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
})