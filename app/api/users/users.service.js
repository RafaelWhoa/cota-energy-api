import {User} from "../../shared/models/User.js";
import {hashPassword} from "../../shared/utils/utils.index.js";



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