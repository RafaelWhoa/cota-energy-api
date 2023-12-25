import {Station} from "../../shared/models/Station.js";

/**
 * Get all stations
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getAllStations = async (req, res) => {
    const stations = await Station.findAll().catch((error) => {
        res.status(400).json({message: "Failed to retrieve stations", error: error.message})
    });
    res.status(200).json(stations);
}

/**
 * Get station by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getStationById = async (req, res) => {
    const station = await Station.findByPk(req.params.id).catch((error) => {
        res.status(400).json({message: "Failed to retrieve station from database", error: error});
    });
    if (station === null) {
        res.status(404).json({message: "Station not found"});
    }
    else {
        res.status(200).json(station);
    }
}

/**
 * Register a new station
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const createStation = async (req, res) => {
    try {
        const station = await Station.create({
            station_name: req.body.station_name
        })
        res.status(201).json({message: "Station saved successfully", station: station});
    } catch (error) {
        res.status(400).json({message: "Failed to save station", error: error});
    }
}

/**
 * Update station data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const updateStation = async (req, res) => {
    const stationId = req.params.id;
    const stationName = req.body.station_name;
    const updateStationData = async () => {
        const station = await Station.findByPk(stationId);
        if (station !== undefined) {
            await station.update({
                station_name: stationName !== undefined ? stationName : station.dataValues.charger_code
            })
            await station.save();
            res.status(200).json({message: "Station data updated successfully", station: station})
        }
        else {
            throw new Error();
        }
    }
    try {
        await updateStationData();
    }
    catch (error) {
        res.status(400).json({message: "Station not found, check id", error: error.message})
    }
}

/**
 * Delete station by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const deleteStation = async (req, res) => {
    const stationId = req.params.id;
    Station.destroy({
        where: {
            id: stationId
        }
    }).then(() => {
        res.status(200).json({message: "Station deleted successfully"});
    }).catch((error) => {
        res.status(400).json({message: "Failed to delete station", error: error});
    })
}