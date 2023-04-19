import { loginUser } from "../controllers/user";
import { registerUser } from "../controllers/user";
import express from "express";
export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
