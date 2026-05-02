import { Module } from '@nestjs/common';
import { TwoFactorController } from './two-factor.controller';
import { TwoFactorService } from './two-factor.service';
import { ClientModule, Services } from '@ross2p/common';

@Module({
  controllers: [TwoFactorController],
  providers: [TwoFactorService],
  imports: [ClientModule.register(Services.USER)],
})
export class TwoFactorModule {}
