import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcRequest, ValidationPipe } from '@ross2p/common';
import { NotificationPreferenceProto } from '../../generated/protos';
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
    @GrpcRequest(
      new ValidationPipe<UpdatePreferenceMessageType>(
        updatePreferenceMessageSchema,
      ),
    )
    data: UpdatePreferenceMessageType,
  ): Promise<NotificationPreferenceProto.PreferenceMessage> {
    return this.preferenceService.updatePreference(
      data.userId,
      data.eventType,
      data.channel,
      data.enabled,
    );
  }
}
