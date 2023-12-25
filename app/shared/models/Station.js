import {sequelize} from "../db/db.connection.js";
import {DataTypes} from "sequelize";
import {Charger} from "./Charger.js";

export const Station = sequelize.define("stations", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    station_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    station_address: {
        type: DataTypes.STRING,
    }
});

Station.hasMany(Charger);
Charger.belongsTo(Station);