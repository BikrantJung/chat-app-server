import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { accessChat } from "../controllers/chat/accessChat";
import { getChats } from "../controllers/chat/getChats";
import { createGroupChat } from "../controllers/chat/createGroupChat";
import { renameGroup } from "../controllers/chat/renameGroup";
import { joinGroup } from "../controllers/chat/joinGroup";
import { leaveGroup } from "../controllers/chat";
export const chatRoutes = express.Router();

// /api/chat/
chatRoutes.post("/access-chat", protect, accessChat);
chatRoutes.get("/get-all-chats", protect, getChats);
chatRoutes.post("/create-group-chat", protect, createGroupChat);
chatRoutes.put("/rename-group", protect, renameGroup);
chatRoutes.put("/join-group", protect, joinGroup);
chatRoutes.put("/leave-group", protect, leaveGroup);
// Protect Middleware
