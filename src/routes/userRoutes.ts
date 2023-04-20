import { getUser, loginUser } from "../controllers/user";
import { registerUser } from "../controllers/user";
import express from "express";
import { protect } from "../middlewares/authMiddleware";
export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
// Protect Middleware
userRoutes.get("/getUser", protect, getUser);
