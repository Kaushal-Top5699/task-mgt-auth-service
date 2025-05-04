import { DataTypes } from "sequelize";
import { sequelize } from "../DB/db.js";

export const ManagerApproval = sequelize.define('ManagerApproval', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // auto-generates UUID v4
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
}, 
    {
        timestamps: true // adds createdAt, updatedAt
    }
)