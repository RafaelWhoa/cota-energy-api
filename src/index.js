import express from "express";
import stations_router from "./routes/stations.js";
import chargers_router from "./routes/chargers.js";
import { dbConnection, sequelize } from "./config/dbConnection.js";
import logger from "./logger.js";
import { Station } from "./models/Station.js";
import { Charger } from "./models/Charger.js";

const app = express();

const PORT = 8080;

app.listen(PORT || process.env.PORT, () => {logger.info(`Server is running at http://localhost:${PORT}/`)});

dbConnection().catch((error) => {logger.error("Unable to connect to the database:" + error.message)});

app.use(express.json());
app.use("/stations", stations_router);
app.use("/chargers", chargers_router);