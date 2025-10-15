import { Module } from '@nestjs/common';
import { MailConfirmationService } from './mail-confirmation.service';
import { MailConfirmationController } from './mail-confirmation.controller';

@Module({
  providers: [MailConfirmationService],
  controllers: [MailConfirmationController]
})
export class MailConfirmationModule {}
