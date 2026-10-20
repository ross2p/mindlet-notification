import { NotificationCoreProto } from '../../../generated/protos';

export class SendTwoFactorDto {
  userId!: string;
  code!: string;
  provider!: NotificationCoreProto.Provider;
}
