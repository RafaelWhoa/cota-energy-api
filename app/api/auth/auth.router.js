import express from "express";
import {login} from "./auth.service.js";
const auth_router = express.Router();

auth_router.post('/login', login)

export default auth_router;