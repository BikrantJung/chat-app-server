import { Request, Response } from "express";
import { CustomRequest } from "../../types/request.type";
import { accessChatSchema } from "./dto/chat.dto";
import { Chat } from "../../models/chat.model";
import { User } from "../../models/user.model";

export const accessChat = async (req: CustomRequest, res: Response) => {
  try {
    const validatedData = accessChatSchema.validate(req.body);
    if (validatedData.error) {
      throw new Error(validatedData.error.message);
    }
    const { userId } = validatedData.value;
    // isChat = { chatname:"",isGroupChat:false,users:{id,username}, latestMessage }
    let isChat: any = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user?._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    isChat = await User.populate(isChat, {
      path: "latestMessage",
      select: "username profilePicture id",
    });

    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
      const createdChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user?._id, userId],
      });
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
