import { Module } from '@nestjs/common';
import { EventClientModule, Services } from '@ross2p/common';
import { MailConfirmationController } from './mail-confirmation.controller';
import { MailConfirmationService } from './mail-confirmation.service';

@Module({
  imports: [EventClientModule.register(Services.USER)],
  controllers: [MailConfirmationController],
  providers: [MailConfirmationService],
})
export class MailConfirmationModule {}
