const express = require("express");
const chargers_router = express.Router();
const  { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');
const logger = require("../logger.js");
const e = require("express");

chargers_router.get('/', async (req, res) => {
    const chargers = await Charger.findAll()
        .catch((error) => {logger.error("Failed to get data from database: ", error.message)});
    res.status(200).json(chargers);
})

chargers_router.get('/:id', async (req, res) => {
    const id = req.params.id
    const getCharger = async () => {
        const charger = await Charger.findByPk(id)
        if (charger !== undefined){
            res.status(200).json(charger)
        }
        else {
            throw new Error();
        }
    }
    try{
        await getCharger();
    }
    catch (error){
        res.status(404).json({message: "Charger not found", error: error})
    }
})

chargers_router.post('/register', async (req, res) => {
    try {
        const charger = await Charger.create({
            charger_code: req.body.charger_code,
            charger_power: req.body.charger_power,
            charger_connNumber: req.body.charger_connNumber
        })
        res.status(201).json({message: "Charger saved successfully", charger: charger})
    }
    catch (error) {
        res.status(400).json({message: "Failed to save charger", error: error})
    }
})

module.exports.chargers = chargers_router;