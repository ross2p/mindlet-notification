import { Controller } from '@nestjs/common';
import { MailConfirmationService } from './mail-confirmation.service';
import { DataPayload, ValidationPipe } from '@ross2p/common';
import { MessagePattern } from '@nestjs/microservices';
import { mailConfirmationSchema } from './mail-confirmation.schema';

@Controller()
export class MailConfirmationController {
  constructor(
    private readonly mailConfirmationService: MailConfirmationService,
  ) {}

  @MessagePattern('email.send-mail-confirmation')
  public async sendMailConfirmation(
    @DataPayload(new ValidationPipe(mailConfirmationSchema))
    data: {
      userId: string;
      code: string;
    },
  ) {
    return this.mailConfirmationService.sendConfirmationEmail(
      data.userId,
      data.code,
    );
  }
}
