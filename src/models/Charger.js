const { sequelize } = require('../config/dbConnection.js');
const {DataTypes} = require("sequelize");
const logger = require("../logger");

const Charger = sequelize.define('Charger', {
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
        allowNull: false
    },
    charger_status: {
        type: DataTypes.INTEGER,
    },
    charger_station: {
        type: DataTypes.STRING,
    },
    charger_price: {
        type: DataTypes.INTEGER,
    },
    charger_connNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

Charger.sync({force: true})
    .then(() => {logger.info("Chargers table synced!")})
    .catch((error) => {logger.error("Chargers table sync failed: ", error.message)});

module.exports = Charger;
