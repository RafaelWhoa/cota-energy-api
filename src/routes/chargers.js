const express = require("express");
const chargers_router = express.Router();
const  { Sequelize } = require('sequelize');
const { dbConnection } = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');

dbConnection().catch(console.error);

Charger.sync({force: true}).then().catch(console.error);

chargers_router.get('/', (req, res) => {
    const chargers = dbConnection.findAll().catch(console.error);
    res.JSON(chargers);
})

module.exports.chargers = chargers_router;