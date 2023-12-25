import express from "express";
import stations_router from "./api/stations/stations.router.js";
import chargers_router from "./api/chargers/chargers.router.js";
import { DbConnection, sequelize } from "./shared/db/db.connection.js";
import { logger } from "./shared/utils/utils.index.js";

const app = express();

const PORT = 8080;

app.listen(PORT || process.env.PORT, () => {logger.info(`Server is running at http://localhost:${PORT}/`)});

DbConnection().catch((error) => {logger.error("Unable to connect to the database:" + error.message)});

app.use(express.json());
app.use("/stations", stations_router);
app.use("/chargers", chargers_router);