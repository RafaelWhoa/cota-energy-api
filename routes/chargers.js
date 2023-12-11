const express = require("express");
const chargers_router = express.Router();
const  { Sequelize } = require('sequelize');
const { dbConnection } = require('../config/dbConnection.js');

dbConnection().catch(console.error);

chargers_router.get('/', (req, res) => {

})

module.exports.chargers = chargers_router;