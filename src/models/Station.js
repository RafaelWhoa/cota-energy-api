const { sequelize } = require('../config/dbConnection.js');
const { DataTypes } = require("sequelize");
const logger = require("../logger");

const Station = sequelize.define('Station', {
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
        allowNull: false
    }
});

Station.sync()
    .then(() => {logger.info("Station table synced!")})
    .catch((error) => {logger.error("Station table sync failed: ", error.message)});

module.exports = Station;