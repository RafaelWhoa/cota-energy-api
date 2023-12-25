import {sequelize} from "../db/db.connection.js";
import {DataTypes} from "sequelize";


export const Charger = sequelize.define("chargers", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    charger_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    charger_power: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    charger_plugs: {
        type: DataTypes.INTEGER,
    },
    charger_status: {
        type: DataTypes.INTEGER,
    },
    charger_price: {
        type: DataTypes.INTEGER,
    },
    charger_connNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});