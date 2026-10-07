import * as Joi from 'joi';
import type { SendMailConfirmationDto } from './dtos/send-mail-confirmation.dto';

export const mailConfirmationSchema = Joi.object<SendMailConfirmationDto>({
  userId: Joi.string().uuid().required(),
  code: Joi.string().length(6).required(),
});
