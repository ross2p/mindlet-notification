import * as Joi from 'joi';

export const mailConfirmationSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  code: Joi.string().length(6).required(),
});
