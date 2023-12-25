import express from "express";
const stations_router = express.Router();
import { Station } from "../models/Station.js";
import logger from "../logger.js";
import {Charger} from "../models/Charger.js";

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

/**
 * Update station data
 * @param id Station id to be updated
 */
stations_router.put('/:id', async (req, res) => {
    const stationId = req.params.id;
    const stationName = req.body.station_name;
    const updateStationData = async () => {
        const station = await Station.findByPk(stationId);
        if (station !== undefined) {
            await station.update({
                station_name: stationName !== undefined ? stationName : station.dataValues.charger_code
            })
            await station.save();
            res.status(200).json({message: "Station data updated successfully", station: station})
        }
        else {
            throw new Error();
        }
    }
    try {
        await updateStationData();
    }
    catch (error) {
        res.status(400).json({message: "Station not found, check id", error: error.message})
    }
})

/**
 * Delete station
 * @param id Station id to be deleted
 */
stations_router.delete('/delete/:id', async (req, res) => {
  const stationId = req.params.id;
  Station.destroy({
      where: {
          id: stationId
      }
  }).then(() => {
      res.status(200).json({message: "Station deleted successfully"});
  }).catch((error) => {
        res.status(400).json({message: "Failed to delete station", error: error});
  })
})

export default stations_router;