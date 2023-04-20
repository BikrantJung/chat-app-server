import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { accessChat } from "../controllers/chat/accessChat";
export const chatRoutes = express.Router();

chatRoutes.post("/access-chat", protect, accessChat);
// chatRoutes.get("/get-all-chats", protect, getChats);
// chatRoutes.post("/create-group", protect, createGroup);
// chatRoutes.put("/rename-group", protect, renameGroup);
// chatRoutes.put("/leave-group", protect, leaveGroup);
// chatRoutes.put("/join-group", protect, joinGroup);
// Protect Middleware
