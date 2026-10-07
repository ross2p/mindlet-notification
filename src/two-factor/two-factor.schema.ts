import * as Joi from 'joi';
import type { SendTwoFactorDto } from './dtos/send-two-factor.dto';
import { NotificationCoreProto } from '@ross2p/common';

export const twoFactorSchema = Joi.object<SendTwoFactorDto>({
  userId: Joi.string().uuid().required(),
  code: Joi.string().length(6).required(),
  provider: Joi.string()
    .valid(...Object.values(NotificationCoreProto.Provider))
    .required(),
});
