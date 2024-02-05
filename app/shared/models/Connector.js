import {sequelize} from "../db/db.connection.js";
import {DataTypes} from "sequelize";

export const Connector = sequelize.define("connectors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    connectorType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    connPower: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})