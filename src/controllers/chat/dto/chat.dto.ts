import Joi from "joi";

export const accessChatSchema = Joi.object({
  userId: Joi.string().required(),
});
export const createGroupChatSchema = Joi.object({
  // The array must have at least 1 user
  users: Joi.array().required().items(Joi.string().required()).min(1),
  groupName: Joi.string().required(),
});
export const renameGroupSchema = Joi.object({
  //  Group is actually a chat
  chatName: Joi.string().required(),
  chatId: Joi.string().required(),
});
