import {sequelize} from "../db/db.connection.js";
import {DataTypes} from "sequelize";

export const Charging = sequelize.define("charging", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    start_time: {
        type: DataTypes.DATE,
    },
    end_time: {
        type: DataTypes.DATE,
    },
    total_cost: {
        type: DataTypes.DECIMAL,
    },
    total_power: {
        type: DataTypes.DECIMAL,
    },
    current_power: {
        type: DataTypes.DECIMAL,
    },
    charging_percentage: {
        type: DataTypes.DECIMAL,
    },
    charging_status: {
        type: DataTypes.STRING,
    },
});

