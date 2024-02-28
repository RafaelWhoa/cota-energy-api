import express from "express";
import stations_router from "./api/stations/stations.router.js";
import chargers_router from "./api/chargers/chargers.router.js";
import connectors_router from "./api/connectors/connectors.router.js";
import { DbConnection } from "./shared/db/db.connection.js";
import { logger } from "./shared/utils/utils.index.js";
import {createChargerMock, createStationMock} from "./shared/db/Mocks.js";
import {stationsMocks} from "./api/stations/mock/StationsMock.js";
import {chargersMocks} from "./api/chargers/mock/ChargersMock.js";
import users_router from "./api/users/users.router.js";

const app = express();

const PORT = 8080;

app.listen(PORT || process.env.PORT, () => {logger.info(`Server is running at http://localhost:${PORT}/`)});

DbConnection().then(() => {
    createStationMock(stationsMocks).then(() => {logger.info("Stations mock data created successfully.")});
    createChargerMock(chargersMocks).then(() => {logger.info("Chargers mock data created successfully.")});
}).catch((error) => {logger.error("Unable to connect to the database:" + error.message)});

app.use(express.json());
app.use("/stations", stations_router);
app.use("/chargers", chargers_router);
app.use("/connectors", connectors_router);
app.use("/users", users_router);