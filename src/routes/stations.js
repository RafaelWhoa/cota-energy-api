import express from "express";
const stations_router = express.Router();
import { Station } from "../models/Station.js";
import logger from "../logger.js";

stations_router.get('/', (req, res) => {
    const stations = Station.findAll().catch((error) => {
        logger.error("Unable to retrieve stations:", error);
    });
    res.status(200).json(stations);
})

export default stations_router;