import { Module } from '@nestjs/common';
import { EventClientModule, Services } from '@ross2p/common';
import { MailConfirmationService } from './mail-confirmation.service';

@Module({
  imports: [EventClientModule.register(Services.USER)],
  providers: [MailConfirmationService],
  exports: [MailConfirmationService],
})
export class MailConfirmationModule {}
