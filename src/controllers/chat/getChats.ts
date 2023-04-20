/**
 * Get all chats of the logged in user
 * @route /api/chat/get-all-chats
 *
 */

import { Response } from "express";
import { CustomRequest } from "../../types/request.type";
import { Chat } from "../../models/chat.model";
import { User } from "../../models/user.model";

export const getChats = async (req: CustomRequest, res: Response) => {
  try {
    let chats: any = await Chat.find({
      users: {
        $elemMatch: {
          $eq: req.user?._id,
        },
      },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    chats = await User.populate(chats, {
      path: "latestMessage",
      select: "username profilePicture id",
    });
    res.status(200).json(chats);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
