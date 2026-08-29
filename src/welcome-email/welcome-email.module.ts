import { Module } from '@nestjs/common';
import { ClientModule, Services } from '@ross2p/common';
import { WelcomeEmailController } from './welcome-email.controller';
import { WelcomeEmailService } from './welcome-email.service';

@Module({
  imports: [ClientModule.register(Services.USER)],
  controllers: [WelcomeEmailController],
  providers: [WelcomeEmailService],
})
export class WelcomeEmailModule {}
