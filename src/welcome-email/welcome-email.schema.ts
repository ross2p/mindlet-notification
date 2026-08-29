import * as Joi from 'joi';

export const sendWelcomeEmailSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});
