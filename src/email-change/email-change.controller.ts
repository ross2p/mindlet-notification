import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  NotificationMessage,
  ValidationPipe,
} from '@ross2p/common';
import { SendEmailChangeCodeDto } from './dtos/send-email-change-code.dto';
import { SendEmailChangeWarningDto } from './dtos/send-email-change-warning.dto';
import {
  sendEmailChangeCodeSchema,
  sendEmailChangeWarningSchema,
} from './email-change.schema';
import { EmailChangeService } from './email-change.service';

@Controller()
export class EmailChangeController {
  constructor(private readonly emailChangeService: EmailChangeService) {}

  @MessagePattern(NotificationMessage.SEND_EMAIL_CHANGE_CODE)
  public sendChangeCode(
    @DataPayload(new ValidationPipe(sendEmailChangeCodeSchema))
    data: SendEmailChangeCodeDto,
  ) {
    return this.emailChangeService.sendChangeCode(data.email, data.code);
  }

  @MessagePattern(NotificationMessage.SEND_EMAIL_CHANGE_WARNING)
  public sendChangeWarning(
    @DataPayload(new ValidationPipe(sendEmailChangeWarningSchema))
    data: SendEmailChangeWarningDto,
  ) {
    return this.emailChangeService.sendChangeWarning(data.email, data.newEmail);
  }
}
