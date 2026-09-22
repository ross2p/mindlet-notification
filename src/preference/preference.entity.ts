import type { NotificationPreference } from '.prisma/client-notification';

export class PreferenceEntity implements NotificationPreference {
  id: string;
  userId: string;
  eventType: string;
  channel: NotificationPreference['channel'];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
