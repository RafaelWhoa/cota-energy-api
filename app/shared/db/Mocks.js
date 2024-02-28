import {Charger} from "../models/Charger.js";
import {logger} from "../utils/utils.index.js";
import {Station} from "../models/Station.js";

export const createChargerMock = async (chargerMocks) => {
    for (const charger of chargerMocks){
        await Charger.create({
            charger_code: charger.charger_code,
            charger_power: charger.charger_power
        }).catch((error) => {
            logger.error("Failed to save charger mock: " + error.message);
        });
    }
}

/**
 * Create station mock data
 * @param stationMocks - array of station mocks
 * @returns {Promise<void>}
 */
export const createStationMock = async (stationMocks) => {
    for (const station of stationMocks){
        await Station.create({
            station_name: station.station_name,
            station_address: station.station_address
        }).catch((error) => {
            logger.error("Failed to save station mock: " + error.message);
        });
    }
}