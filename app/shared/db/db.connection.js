import {Sequelize} from "sequelize";
import {logger} from "../utils/utils.index.js";

import dotenv from "dotenv";
import {createStationMock} from "../../api/stations/stations.service.js";
import {stationsMocks} from "../../api/stations/mock/StationsMock.js";

dotenv.config();

export const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

export const DbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true}).then(() => {
            logger.info("Tables synced successfully.")
        }).catch((error) => {
            logger.error("Unable to sync tables: " + error.message)
        });
        logger.info(`Connection with database ${process.env.DB_NAME} has been established successfully.`);
        createStationMock(stationsMocks).then(() => {logger.info("Mock stations created successfully.")});
    } catch (error) {
        logger.error("Unable to connect to the database:" + error.message);
    }
};