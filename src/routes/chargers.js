const express = require("express");
const chargers_router = express.Router();
const  { Sequelize } = require('sequelize');
const { sequelize } = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');
const logger = require("../logger.js");

chargers_router.get('/', async (req, res) => {
    const chargers = await Charger.findAll()
        .catch((error) => {logger.error("Failed to get data from database: ", error.message)});
    res.status(300).json(chargers);
})

chargers_router.post('/register', async (req, res) => {
    try {
        const charger = await Charger.create({
            charger_code: req.body.charger_code,
            charger_power: req.body.charger_power,
            charger_connNumber: req.body.charger_connNumber
        })
        await charger.save();
        res.status(300).json({message: "Charger saved successfully", charger: charger})
    }
    catch (error) {
        logger.error("Failed to save charger: ", error)
    }
})

module.exports.chargers = chargers_router;