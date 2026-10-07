import { Module } from '@nestjs/common';
import { EventClientModule, Services } from '@ross2p/common';
import { WelcomeEmailService } from './welcome-email.service';

@Module({
  imports: [EventClientModule.register(Services.USER)],
  providers: [WelcomeEmailService],
  exports: [WelcomeEmailService],
})
export class WelcomeEmailModule {}
