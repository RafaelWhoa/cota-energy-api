import express from "express";
const stations_router = express.Router();
import { Station } from "../models/Station.js";
import logger from "../logger.js";

// Get all stations
stations_router.get('/', async (req, res) => {
    const stations = await Station.findAll().catch((error) => {
        logger.error("Unable to retrieve stations:", error);
    });
    res.status(200).json(stations);
})

// Register a new station
stations_router.post('/register', async (req, res) => {
    try {
        const station = await Station.create({
            station_name: req.body.station_name
        })
        res.status(201).json({message: "Station saved successfully", station: station});
    } catch (error) {
        res.status(400).json({message: "Failed to save station", error: error});
    }
})

export default stations_router;