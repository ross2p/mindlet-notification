import * as Joi from 'joi';
import type { SendWelcomeEmailDto } from './dtos/send-welcome-email.dto';

export const sendWelcomeEmailSchema = Joi.object<SendWelcomeEmailDto>({
  userId: Joi.string().uuid().required(),
});
