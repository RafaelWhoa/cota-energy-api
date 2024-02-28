import {sequelize} from "../db/db.connection.js"
import {DataTypes} from "sequelize";

export const Connector = sequelize.define("connectors", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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