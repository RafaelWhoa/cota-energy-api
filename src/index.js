const express = require('express');
const chargers_router = require('./routes/chargers.js').chargers;
const { dbConnection } = require('./config/dbConnection.js');
const logger = require('./logger.js');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use("/chargers", chargers_router);

app.listen(PORT || process.env.PORT, () => {logger.info(`Server is running at http://localhost:${PORT}/`)});

dbConnection().catch((error) => {logger.error("Unable to connect to the database:", error)});