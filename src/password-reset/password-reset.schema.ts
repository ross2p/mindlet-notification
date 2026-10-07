import * as Joi from 'joi';
import type { SendPasswordResetDto } from './dtos/send-password-reset.dto';

export const sendPasswordResetSchema = Joi.object<SendPasswordResetDto>({
  userId: Joi.string().uuid().required(),
  token: Joi.string().min(1).required(),
});
