import express from "express";
const stations_router = express.Router();
import {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation
} from "./stations.service.js";

stations_router.get('/', getAllStations)
stations_router.get('/:id', getStationById)
stations_router.post('/register', createStation)
stations_router.put('/:id', updateStation)
stations_router.delete('/delete/:id', deleteStation)

export default stations_router;