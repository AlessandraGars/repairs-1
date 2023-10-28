import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

// Definición del modelo Repairs
const Repairs = sequelize.define('Repairs', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // Valor predeterminado para 'status'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    }
}, {
    timestamps: false // Desactiva las marcas de tiempo
});

export default Repairs;
