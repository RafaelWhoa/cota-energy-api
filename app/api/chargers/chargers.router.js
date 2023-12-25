import express from "express";
const chargers_router = express.Router();
import {
    getAllChargers,
    getChargerById,
    createCharger,
    updateCharger,
    deleteCharger
} from "./chargers.service.js";

chargers_router.get('/', getAllChargers)
chargers_router.get('/:id', getChargerById)
chargers_router.post('/register', createCharger)
chargers_router.put('/:id', updateCharger)
chargers_router.delete('/delete/:id', deleteCharger)

export default chargers_router;