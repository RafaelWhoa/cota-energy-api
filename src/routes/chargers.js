const express = require("express");
const chargers_router = express.Router();
const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/dbConnection.js');
const Charger = require('../models/Charger.js');
const logger = require("../logger.js");
const e = require("express");

// Get all chargers
chargers_router.get('/', async (req, res) => {
    const chargers = await Charger.findAll()
        .catch((error) => {
            logger.error("Failed to get data from database: ", error.message)
        });
    res.status(200).json(chargers);
})

/**
 * Get charger by id
 * @param id Charger id to be found
 */
chargers_router.get('/:id', async (req, res) => {
    const id = req.params.id
    const getCharger = async () => {
        const charger = await Charger.findByPk(id)
        if (charger !== undefined) {
            res.status(200).json(charger)
        } else {
            throw new Error();
        }
    }
    try {
        await getCharger();
    } catch (error) {
        res.status(404).json({message: "Charger not found", error: error})
    }
})

// Register charger
chargers_router.post('/register', async (req, res) => {
    try {
        const charger = await Charger.create({
            charger_code: req.body.charger_code,
            charger_power: req.body.charger_power,
            charger_connNumber: req.body.charger_connNumber
        })
        res.status(201).json({message: "Charger saved successfully", charger: charger})
    } catch (error) {
        res.status(400).json({message: "Failed to save charger", error: error})
    }
})

chargers_router.put('/:id', async (req, res) => {
    const chargerId = req.params.id;
    const chargerCode = req.body.charger_code;
    const chargerPower = req.body.charger_power;
    const chargerConnNumber = req.body.charger_connNumber;
    const updateChargerData = async () => {
        const charger = await Charger.findByPk(chargerId);
        if (charger !== undefined) {
            await charger.update({
                charger_code: chargerCode !== undefined ? chargerCode : charger.dataValues.charger_code,
                charger_power: chargerPower !== undefined ? chargerPower : charger.dataValues.charger_power,
                charger_connNumber: chargerConnNumber !== undefined ? chargerConnNumber : charger.dataValues.charger_connNumber,
            })
            await charger.save();
            res.status(200).json({message: "Charger data updated successfully", charger: charger})
        }
        else {
            throw new Error();
        }
    }
    try {
        await updateChargerData();
    }
    catch (error) {
        res.status(400).json({message: "Failed while updating charger data", error: error})
    }
})

/**
 * Delete charger by id
 * @param id Id of the charger to be deleted
 */
chargers_router.delete('/delete/:id', (req, res) => {
    const chargerId = req.params.id;
    Charger.destroy({
        where: {id: chargerId}
    })
        .then(() => {
            res.status(200).json({message: "Charger deleted successfully"})
        })
        .catch((error) => {
            res.status(400).json({message: "Failed to delete charger", error: error})
        })
})

module.exports.chargers = chargers_router;