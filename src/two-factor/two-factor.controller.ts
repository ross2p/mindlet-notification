import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  NotificationMessage,
  ValidationPipe,
} from '@ross2p/common';
import { SendTwoFactorDto } from './dtos/send-two-factor.dto';
import { twoFactorSchema } from './two-factor.schema';
import { TwoFactorService } from './two-factor.service';

@Controller()
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @MessagePattern(NotificationMessage.SEND_TWO_FACTOR)
  public async sendTwoFactor(
    @DataPayload(new ValidationPipe(twoFactorSchema))
    data: SendTwoFactorDto,
  ) {
    return this.twoFactorService.sendTwoFactor(
      data.provider,
      data.userId,
      data.code,
    );
  }
}
