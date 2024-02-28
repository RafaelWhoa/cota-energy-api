import express from "express";
import {getAllUsers, registerUser} from "./users.service.js";
const users_router = express.Router();

users_router.get('/', getAllUsers)
users_router.post('/register', registerUser)

export default users_router;