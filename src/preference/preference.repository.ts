import { Injectable } from '@nestjs/common';
import type { NotificationChannel } from '.prisma/client-notification';
import { DatabaseService } from '../database/database.service';
import { PreferenceEntity } from './preference.entity';

@Injectable()
export class PreferenceRepository {
  constructor(private readonly db: DatabaseService) {}

  /** No row for a cell means enabled -- the opt-out default (AC-09). */
  public async isEnabled(
    userId: string,
    eventType: string,
    channel: NotificationChannel,
  ): Promise<boolean> {
    const row = await this.db.notificationPreference.findUnique({
      where: { userId_eventType_channel: { userId, eventType, channel } },
    });
    return row ? row.enabled : true;
  }

  public setEnabled(
    userId: string,
    eventType: string,
    channel: NotificationChannel,
    enabled: boolean,
  ): Promise<PreferenceEntity> {
    return this.db.notificationPreference.upsert({
      where: { userId_eventType_channel: { userId, eventType, channel } },
      create: { userId, eventType, channel, enabled },
      update: { enabled },
    });
  }

  public findAllForUser(userId: string): Promise<PreferenceEntity[]> {
    return this.db.notificationPreference.findMany({ where: { userId } });
  }
}
