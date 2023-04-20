import { Response } from "express";
import { CustomRequest } from "../../types/request.type";
import { createGroupChatSchema } from "./dto/chat.dto";
import { Chat } from "../../models/chat.model";

export const createGroupChat = async (req: CustomRequest, res: Response) => {
  try {
    // Get all data from body
    const { users: bodyUsers, groupName: bodyGroupName } = req.body;

    //  Pass data for validation by parsing (if users was not stringified, we would directly pass req.body to validate())
    const validatedData = createGroupChatSchema.validate({
      users: JSON.parse(bodyUsers),
      groupName: bodyGroupName,
    });

    if (validatedData.error) throw new Error(validatedData.error.message);

    const { users, groupName } = validatedData.value;

    users.push(req.user?._id);

    const groupChat = await Chat.create({
      chatName: groupName,
      users,
      isGroupChat: true,
      groupAdmin: req.user?._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
