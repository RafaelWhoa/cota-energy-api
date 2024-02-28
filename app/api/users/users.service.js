import {User} from "../../shared/models/User.js";
import * as crypto from "crypto";

const hashPassword = (password) => {
    const salt = crypto.randomBytes(32);
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

export const getAllUsers = async (req, res) => {
    const users = await User.findAll().catch((error) => {
        res.status(400).json({message: "Failed to retrieve users", error: error.message})
    });
    res.status(200).json(users);
}

export const registerUser = async (req, res) => {
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(req.body.password)
        });
        res.status(201).json({message: "User registered successfully", user: user});
    } catch (error) {
        res.status(400).json({message: "Failed to register user", error: error.message})
    }
}