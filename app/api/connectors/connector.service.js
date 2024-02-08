import {Connector} from "../../shared/models/Connector.js";

/**
 * Get all connectors
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getAllConnectors = async (req, res) => {
    const connectors = await Connector.findAll();
    res.status(200).json(connectors);
}

/**
 * Get connector by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getConnectorById = async (req, res) => {
    const id = req.params.id
    const getConnector = async () => {
        const connector = await Connector.findByPk(id)
        if (connector !== undefined) {
            res.status(200).json(connector)
        } else {
            throw new Error();
        }
    }
    try {
        await getConnector();
    } catch (error) {
        res.status(404).json({message: "Connector not found", error: error})
    }
}

/**
 * Register connector
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const createConnector = async (req, res) => {
    try {
        const connector = await Connector.create({
            connectorType: req.body.connectorType,
            connPower: req.body.connPower,
            available: req.body.available
        })
        res.status(201).json({message: "Connector saved successfully", connector: connector})
    } catch (error) {
        res.status(400).json({message: "Failed to save connector", error: error})
    }
}

/**
 * Update connector data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const updateConnector = async (req, res) => {
    const connectorId = req.params.id;
    const connectorType = req.body.connectorType;
    const connPower = req.body.connPower;
    const available = req.body.available;
    const updateConnectorData = async () => {
        const connector = await Connector.findByPk(connectorId);
        if (connector !== null) {
            connector.connectorType = connectorType;
            connector.connPower = connPower;
            connector.available = available;
            await connector.save();
            res.status(200).json({message: "Connector updated successfully", connector: connector});
        } else {
            throw new Error();
        }
    }
    try {
        await updateConnectorData();
    } catch (error) {
        res.status(404).json({message: "Connector not found", error: error});
    }
}

/**
 * Delete connector by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const deleteConnector = async (req, res) => {
    const id = req.params.id;
    const deleteConnector = async () => {
        const connector = await Connector.findByPk(id);
        if (connector !== null) {
            await connector.destroy();
            res.status(200).json({message: "Connector deleted successfully"});
        } else {
            throw new Error();
        }
    }
    try {
        await deleteConnector();
    } catch (error) {
        res.status(404).json({message: "Connector not found", error: error});
    }
}