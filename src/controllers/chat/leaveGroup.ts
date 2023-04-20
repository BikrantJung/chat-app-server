import { Request, Response } from "express";
import { joinGroupSchema } from "./dto/chat.dto";
import { Chat } from "../../models/chat.model";

export const leaveGroup = async (req: Request, res: Response) => {
  try {
    const { users, chatId } = req.body;

    const validatedData = joinGroupSchema.validate({
      users: JSON.parse(users),
      chatId,
    });

    if (validatedData.error) throw new Error(validatedData.error.message);

    const updatedGroup = await Chat.findOneAndUpdate(
      {
        _id: chatId,
      },
      { $pullAll: { users: JSON.parse(users) } },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(201).json(updatedGroup);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
