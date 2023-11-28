import { DataTypes } from "sequelize";
import db from "../config/db.js";

const users = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
},
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default users;
