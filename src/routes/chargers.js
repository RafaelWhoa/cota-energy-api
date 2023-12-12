const express = require("express");
const chargers_router = express.Router();
const  { Sequelize } = require('sequelize');
const { sequelize } = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');
const logger = require("../logger.js");

chargers_router.get('/', (req, res) => {
    const chargers = Charger.findAll()
        .catch((error) => {logger.error("Failed to get data from database: ", error.message)});
    res.status(300).json(chargers);
})

module.exports.chargers = chargers_router;