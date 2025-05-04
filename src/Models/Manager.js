import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db.js";

export const Manager = sequelize.define('Managers', {
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
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, 
    {
        timestamps: true // adds createdAt, updatedAt
    }
)