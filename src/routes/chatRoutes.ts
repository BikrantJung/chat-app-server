import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { accessChat } from "../controllers/chat/accessChat";
import { getChats } from "../controllers/chat/getChats";
import { createGroupChat } from "../controllers/chat/createGroupChat";
export const chatRoutes = express.Router();

// /api/chat/
chatRoutes.post("/access-chat", protect, accessChat);
chatRoutes.get("/get-all-chats", protect, getChats);
chatRoutes.post("/create-group-chat", protect, createGroupChat);
// chatRoutes.put("/rename-group", protect, renameGroup);
// chatRoutes.put("/leave-group", protect, leaveGroup);
// chatRoutes.put("/join-group", protect, joinGroup);
// Protect Middleware
