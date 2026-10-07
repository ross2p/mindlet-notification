import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationPreferenceProto, ValidationPipe } from '@ross2p/common';
import { updatePreferenceMessageSchema } from '@ross2p/types';
import type { UpdatePreferenceMessageType } from '@ross2p/types';
import { PreferenceService } from './preference.service';

@Controller()
export class PreferenceController
  implements NotificationPreferenceProto.PreferenceServiceController
{
  constructor(private readonly preferenceService: PreferenceService) {}

  @GrpcMethod('PreferenceService', 'listPreferences')
  public async listPreferences(
    request: NotificationPreferenceProto.UserIdRequest,
  ): Promise<NotificationPreferenceProto.PreferenceList> {
    return {
      preferences: await this.preferenceService.getPreferences(request.userId),
    };
  }

  @GrpcMethod('PreferenceService', 'updatePreference')
  public updatePreference(
    request: NotificationPreferenceProto.UpdatePreferenceRequest,
  ): Promise<NotificationPreferenceProto.PreferenceMessage> {
    const data = new ValidationPipe<UpdatePreferenceMessageType>(
      updatePreferenceMessageSchema,
    ).transform(request);
    return this.preferenceService.updatePreference(
      data.userId,
      data.eventType,
      data.channel,
      data.enabled,
    );
  }
}
