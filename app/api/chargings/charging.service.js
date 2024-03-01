import dayjs from "dayjs";
import {Charging} from "../../shared/models/Charging.js";

export const startCharging = async (req, res) => {
    const charging = await Charging.create({
        connector_id: req.body.connector_id,
        start_time: dayjs()
    })
    res.status(201).json({message: "Charging saved successfully", charging: charging});
}