import {User} from "../../shared/models/User.js";
import {hashPassword} from "../../shared/utils/utils.index.js";
import jwt from "jsonwebtoken";
import {verifyPassword} from "../../shared/utils/passHashing.utils.js";

export const login = async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}}).catch((error) => {
        res.status(400).json({message: "Failed to retrieve user", error: error.message})
    });
    try {
        if (user === null) {
            res.status(404).json({message: "User not found"});
        } else {
            if (verifyPassword(req.body.password, user.password)) {
                const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.status(200).json({message: "User logged in successfully", token: token});
            } else {
                res.status(401).json({message: "Authentication failed"});
            }
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}