import { Module } from '@nestjs/common';
import { EventClientModule, Services } from '@ross2p/common';
import { WelcomeEmailController } from './welcome-email.controller';
import { WelcomeEmailService } from './welcome-email.service';

@Module({
  imports: [EventClientModule.register(Services.USER)],
  controllers: [WelcomeEmailController],
  providers: [WelcomeEmailService],
})
export class WelcomeEmailModule {}
