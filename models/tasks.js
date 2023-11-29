import { DataTypes } from "sequelize";
import db from "../config/db.js";

const tasks = db.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
},
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default tasks;
