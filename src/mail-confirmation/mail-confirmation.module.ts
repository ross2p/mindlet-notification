import { Module } from '@nestjs/common';
import { ClientModule, Services } from '@ross2p/common';
import { MailConfirmationController } from './mail-confirmation.controller';
import { MailConfirmationService } from './mail-confirmation.service';

@Module({
  imports: [ClientModule.register(Services.USER)],
  controllers: [MailConfirmationController],
  providers: [MailConfirmationService],
})
export class MailConfirmationModule {}
