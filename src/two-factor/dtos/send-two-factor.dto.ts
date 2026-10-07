import { NotificationCoreProto } from '@ross2p/common';

export class SendTwoFactorDto {
  userId!: string;
  code!: string;
  provider!: NotificationCoreProto.Provider;
}
