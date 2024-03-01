import express from "express";
import {startCharging} from "./charging.service.js";

const charging_router = express.Router();

charging_router.post("/start", startCharging);

export default charging_router;