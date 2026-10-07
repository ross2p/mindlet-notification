import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { EventClientModule, Services } from '@ross2p/common';

@Module({
  providers: [TwoFactorService],
  exports: [TwoFactorService],
  imports: [EventClientModule.register(Services.USER)],
})
export class TwoFactorModule {}
