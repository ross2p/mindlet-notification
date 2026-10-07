import { NotificationPreferenceProto } from '@ross2p/common';
import type { NotificationPreference } from '.prisma/client-notification';

export class PreferenceEntity implements NotificationPreference {
  id: string;
  userId: string;
  eventType: string;
  channel: NotificationPreferenceProto.NotificationChannel;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
