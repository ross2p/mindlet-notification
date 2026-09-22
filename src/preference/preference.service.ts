import { Injectable } from '@nestjs/common';
import type { NotificationChannel } from '.prisma/client-notification';
import { PreferenceRepository } from './preference.repository';
import { PreferenceEntity } from './preference.entity';

@Injectable()
export class PreferenceService {
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  public getPreferences(userId: string): Promise<PreferenceEntity[]> {
    return this.preferenceRepository.findAllForUser(userId);
  }

  public updatePreference(
    userId: string,
    eventType: string,
    channel: NotificationChannel,
    enabled: boolean,
  ): Promise<PreferenceEntity> {
    return this.preferenceRepository.setEnabled(
      userId,
      eventType,
      channel,
      enabled,
    );
  }

  /**
   * Dispatch-time filter (AC-09/10): a caller sending a notification asks
   * this before sending. A muted result never touches the triggering
   * event's own side effects -- it only decides whether this one channel
   * gets a message.
   */
  public shouldDispatch(
    userId: string,
    eventType: string,
    channel: NotificationChannel,
  ): Promise<boolean> {
    return this.preferenceRepository.isEnabled(userId, eventType, channel);
  }
}
