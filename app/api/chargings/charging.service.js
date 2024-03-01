import dayjs from "dayjs";
import {Charging} from "../../shared/models/Charging.js";

export const startCharging = async (req, res) => {
    const charging = await Charging.create({
        connector_id: req.body.connector_id,
        start_time: dayjs()
    })
    res.status(201).json({message: "Charging saved successfully", charging: charging});
}

export const updateCharging = async (req, res) => {
    const chargingId = req.params.id;
    const totalPower = req.body.total_power;
    const currentPower = req.body.current_power;
    const chargingPercentage = req.body.charging_percentage;

    const updateChargingData = async () => {
        const charging = await Charging.findByPk(chargingId);
        if (charging !== undefined) {
            await charging.update({
                total_power: totalPower,
                current_power: currentPower,
                charging_percentage: chargingPercentage,
            })
            await charging.save();
        }
        else {
            res.status(404).json({message: "Charging not found"});
        }
        try {
            updateChargingData().then(() => {
                res.status(200).json({message: "Charging updated successfully", charging: charging});
            })
        } catch (error) {
            res.status(400).json({message: "Failed to update charging", error: error.message});
        }
    }
}