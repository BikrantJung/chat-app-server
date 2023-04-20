import { Response } from "express";
import { CustomRequest } from "../../types/request.type";
import { renameGroupSchema } from "./dto/chat.dto";
import { Chat } from "../../models/chat.model";

export const renameGroup = async (req: CustomRequest, res: Response) => {
  try {
    const validatedData = renameGroupSchema.validate(req.body);

    if (validatedData.error) throw new Error(validatedData.error.message);

    const { chatName, chatId } = validatedData.value;
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).json(updatedChat);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
