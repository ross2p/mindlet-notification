import * as Joi from 'joi';

export const sendPasswordResetSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  token: Joi.string().min(1).required(),
});
