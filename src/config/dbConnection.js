import {Sequelize} from "sequelize";
import logger from "../logger.js";

import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({}).then(() => {
            logger.info("Tables synced successfully.")
        }).catch((error) => {
            logger.error("Unable to sync tables:" + error.message)
        });
        logger.info(`Connection with database ${process.env.DB_NAME} has been established successfully.`);
    } catch (error) {
        logger.error("Unable to connect to the database:", error);
    }
};