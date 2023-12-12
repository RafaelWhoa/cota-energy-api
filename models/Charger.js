const { dbConnection } = require('../config/dbConnection.js');
const {DataTypes} = require("sequelize");

const Charger = dbConnection.define('Charger', {
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

module.exports = Charger;
