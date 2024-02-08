import express from "express";
import {
    createConnector,
    deleteConnector,
    getAllConnectors,
    getConnectorById,
    updateConnector
} from "./connectors.service.js";
const connectors_router = express.Router();

connectors_router.get('/', getAllConnectors)
connectors_router.get('/:id', getConnectorById)
connectors_router.post('/register', createConnector)
connectors_router.put('/update/:id', updateConnector)
connectors_router.delete('/delete/:id', deleteConnector)

export default connectors_router;