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

/**
 * Get station by id
 * @param id Station id to be found
 */
stations_router.get('/:id', async (req, res) => {
  const station = await Station.findByPk(req.params.id).catch((error) => {
    res.status(400).json({message: "Failed to retrieve station from database", error: error});
  });
  if (station === null) {
    res.status(404).json({message: "Station not found"});
  }
  else {
    res.status(200).json(station);
  }
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