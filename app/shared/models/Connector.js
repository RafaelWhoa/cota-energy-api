import {sequelize} from "../db/db.connection.js"
import {DataTypes} from "sequelize";
import {Charging} from "./Charging.js";

export const Connector = sequelize.define("connectors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    connector_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    conn_power: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

Connector.hasMany(Charging, {
    foreignKey: "connector_id",
});

Charging.belongsTo(Connector, {
    foreignKey: "connector_id"
});