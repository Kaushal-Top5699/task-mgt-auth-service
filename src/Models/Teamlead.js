import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db.js";

export const Teamlead = sequelize.define('Teamleads', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reportingManagerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, 
    {
        timestamps: true // adds createdAt, updatedAt
    }
)