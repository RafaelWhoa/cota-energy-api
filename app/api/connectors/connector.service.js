import {Connector} from "../../shared/models/Connector.js";


export const getAllConnectors = async (req, res) => {
    const connectors = await Connector.findAll();
    res.status(200).json(connectors);
}

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