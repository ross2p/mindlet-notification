import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { DataPayload, ValidationPipe } from '@ross2p/common';
import { twoFactorSchema } from './two-factor.schema';
import { TwoFactorService } from './two-factor.service';
import { Provider } from 'src/provider.enum';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @MessagePattern('notification.send-two-factor')
  public async sendTwoFactor(
    @DataPayload(new ValidationPipe(twoFactorSchema))
    data: {
      userId: string;
      code: string;
      provider: Provider
    },
  ) {
    return this.twoFactorService.sendTwoFactor(data.provider, data.userId, data.code);
  }
}
