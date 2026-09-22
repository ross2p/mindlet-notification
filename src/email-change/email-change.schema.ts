import * as Joi from 'joi';

export const sendEmailChangeCodeSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  code: Joi.string().length(6).required(),
});

export const sendEmailChangeWarningSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  newEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
