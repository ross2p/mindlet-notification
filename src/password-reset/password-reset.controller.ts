import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  NotificationMessage,
  ValidationPipe,
} from '@ross2p/common';
import { SendPasswordResetDto } from './dtos/send-password-reset.dto';
import { sendPasswordResetSchema } from './password-reset.schema';
import { PasswordResetService } from './password-reset.service';

@Controller()
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @MessagePattern(NotificationMessage.SEND_PASSWORD_RESET)
  public async sendPasswordReset(
    @DataPayload(new ValidationPipe(sendPasswordResetSchema))
    data: SendPasswordResetDto,
  ) {
    return this.passwordResetService.sendPasswordResetEmail(
      data.userId,
      data.token,
    );
  }
}
