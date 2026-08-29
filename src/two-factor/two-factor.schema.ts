import * as Joi from 'joi';
import { Provider } from '../provider.enum';

export const twoFactorSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  code: Joi.string().length(6).required(),
  provider: Joi.string()
    .valid(...Object.values(Provider))
    .required(),
});
