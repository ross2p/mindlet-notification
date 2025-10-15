import { Module } from '@nestjs/common';
import { WelcomeEmailService } from './welcome-email.service';
import { ClientModule, Services } from '@ross2p/common';

@Module({
  providers: [WelcomeEmailService],
  imports: [ClientModule.register(Services.USER)],
})
export class WelcomeEmailModule {}
