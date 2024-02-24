import {Charger} from "../../shared/models/Charger.js";

/**
 * Get all chargers
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getAllChargers = async (req, res) => {
    const chargers = await Charger.findAll();
    res.status(200).json(chargers);
}

/**
 * Get charger by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getChargerById = async (req, res) => {
    const id = req.params.id
    const getCharger = async () => {
        const charger = await Charger.findByPk(id)
        if (charger !== undefined) {
            res.status(200).json(charger)
        } else {
            throw new Error();
        }
    }
    try {
        await getCharger();
    } catch (error) {
        res.status(404).json({message: "Charger not found", error: error})
    }
}

/**
 * Register charger
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const createCharger = async (req, res) => {
    try {
        const charger = await Charger.create({
            charger_code: req.body.charger_code,
            charger_power: req.body.charger_power,
            charger_connNumber: req.body.charger_connNumber,
            station_id: req.body.station_id
        })
        res.status(201).json({message: "Charger saved successfully", charger: charger})
    } catch (error) {
        res.status(400).json({message: "Failed to save charger", error: error})
    }
}

/**
 * Update charger data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const updateCharger = async (req, res) => {
    const chargerId = req.params.id;
    const chargerCode = req.body.charger_code;
    const chargerPower = req.body.charger_power;
    const chargerConnNumber = req.body.charger_connNumber;
    const station_id = req.body.station_id
    const updateChargerData = async () => {
        const charger = await Charger.findByPk(chargerId);
        if (charger !== undefined) {
            await charger.update({
                charger_code: chargerCode !== undefined ? chargerCode : charger.dataValues.charger_code,
                charger_power: chargerPower !== undefined ? chargerPower : charger.dataValues.charger_power,
                charger_connNumber: chargerConnNumber !== undefined ? chargerConnNumber : charger.dataValues.charger_connNumber,
                station_id: station_id !== undefined ? station_id : charger.dataValues.station_id
            })
            await charger.save();
            res.status(200).json({message: "Charger data updated successfully", charger: charger})
        } else {
            throw new Error();
        }
    }
    try {
        await updateChargerData();
    } catch (error) {
        res.status(400).json({message: "Charger not found, check id", error: error})
    }
}

/**
 * Delete charger by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const deleteCharger = async (req, res) => {
    const chargerId = req.params.id;
    Charger.destroy({
        where: {id: chargerId}
    })
        .then(() => {
            res.status(200).json({message: "Charger deleted successfully"})
        })
        .catch((error) => {
            res.status(400).json({message: "Failed to delete charger", error: error})
        })
}