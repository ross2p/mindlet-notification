import * as Joi from 'joi';
import type { SendEmailChangeCodeDto } from './dtos/send-email-change-code.dto';
import type { SendEmailChangeWarningDto } from './dtos/send-email-change-warning.dto';

export const sendEmailChangeCodeSchema = Joi.object<SendEmailChangeCodeDto>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  code: Joi.string().length(6).required(),
});

export const sendEmailChangeWarningSchema =
  Joi.object<SendEmailChangeWarningDto>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    newEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });
