import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { DataPayload, ValidationPipe } from '@ross2p/common';
import { twoFactorSchema } from './two-factor.schema';
import { TwoFactorService } from './two-factor.service';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @MessagePattern('email.send-two-factor')
  public async sendTwoFactorEmail(
    @DataPayload(new ValidationPipe(twoFactorSchema))
    data: {
      userId: string;
      code: string;
    },
  ) {
    return this.twoFactorService.sendTwoFactorEmail(data.userId, data.code);
  }
}
