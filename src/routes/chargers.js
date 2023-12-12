const express = require("express");
const chargers_router = express.Router();
const  { Sequelize } = require('sequelize');
const { dbConnection } = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');
const logger = require("../logger.js");

dbConnection().catch(console.error);

chargers_router.get('/', (req, res) => {
    const chargers = dbConnection.findAll()
        .catch((error) => {logger.error("Failed to get data from database: ", error.message)});
    res.JSON(chargers);
})

module.exports.chargers = chargers_router;