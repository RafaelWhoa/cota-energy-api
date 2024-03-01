import express from "express";
import {startCharging, updateCharging} from "./charging.service.js";

const charging_router = express.Router();

charging_router.post("/start", startCharging);
charging_router.put('/update', updateCharging);

export default charging_router;