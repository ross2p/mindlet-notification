import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  NotificationMessage,
  ValidationPipe,
} from '@ross2p/common';
import { SendWelcomeEmailDto } from './dtos/send-welcome-email.dto';
import { sendWelcomeEmailSchema } from './welcome-email.schema';
import { WelcomeEmailService } from './welcome-email.service';

@Controller()
export class WelcomeEmailController {
  constructor(private readonly welcomeEmailService: WelcomeEmailService) {}

  @MessagePattern(NotificationMessage.SEND_WELCOME)
  public async sendWelcomeEmail(
    @DataPayload(new ValidationPipe(sendWelcomeEmailSchema))
    data: SendWelcomeEmailDto,
  ) {
    return this.welcomeEmailService.sendWelcomeEmail(data.userId);
  }
}
