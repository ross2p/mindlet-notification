import { updatePreferenceMessageSchema } from '@ross2p/types';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  NotificationMessage,
  NotificationQuery,
  ValidationPipe,
  DataPayload,
} from '@ross2p/common';
import { UserIdMessageDto } from './dto/user-id-message.dto';
import { UpdatePreferenceMessageDto } from './dto/update-preference-message.dto';
import { PreferenceService } from './preference.service';

@Controller()
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @MessagePattern(NotificationQuery.GET_PREFERENCES)
  public getPreferences(@DataPayload() data: UserIdMessageDto) {
    return this.preferenceService.getPreferences(data.userId);
  }

  @MessagePattern(NotificationMessage.UPDATE_PREFERENCE)
  public updatePreference(
    @DataPayload(new ValidationPipe(updatePreferenceMessageSchema))
    data: UpdatePreferenceMessageDto,
  ) {
    return this.preferenceService.updatePreference(
      data.userId,
      data.eventType,
      data.channel,
      data.enabled,
    );
  }
}
