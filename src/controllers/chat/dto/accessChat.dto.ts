import Joi from "joi";

export const accessChatSchema = Joi.object({
  userId: Joi.string().required(),
});
