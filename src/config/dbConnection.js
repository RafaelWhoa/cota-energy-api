const { Sequelize } = require('sequelize');
const logger = require("../logger");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        logger.info("Connection with database has been established successfully.");
    } catch (error) {
        logger.error("Unable to connect to the database:", error);
    }
}

module.exports = { dbConnection, sequelize };