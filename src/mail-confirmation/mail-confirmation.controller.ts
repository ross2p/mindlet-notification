import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  NotificationMessage,
  ValidationPipe,
} from '@ross2p/common';
import { SendMailConfirmationDto } from './dtos/send-mail-confirmation.dto';
import { mailConfirmationSchema } from './mail-confirmation.schema';
import { MailConfirmationService } from './mail-confirmation.service';

@Controller()
export class MailConfirmationController {
  constructor(
    private readonly mailConfirmationService: MailConfirmationService,
  ) {}

  @MessagePattern(NotificationMessage.SEND_MAIL_CONFIRMATION)
  public async sendMailConfirmation(
    @DataPayload(new ValidationPipe(mailConfirmationSchema))
    data: SendMailConfirmationDto,
  ) {
    return this.mailConfirmationService.sendConfirmationEmail(
      data.userId,
      data.code,
    );
  }
}
