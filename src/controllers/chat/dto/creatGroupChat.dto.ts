import Joi from "joi";

export const createGroupChatSchema = Joi.object({
  // The array must have at least 2 users
  users: Joi.array().required().items(Joi.string().required()).min(1),
  groupName: Joi.string().required(),
});
