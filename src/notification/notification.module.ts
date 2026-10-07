import { Module } from '@nestjs/common';
import { EmailChangeModule } from '../email-change/email-change.module';
import { MailConfirmationModule } from '../mail-confirmation/mail-confirmation.module';
import { PasswordResetModule } from '../password-reset/password-reset.module';
import { TwoFactorModule } from '../two-factor/two-factor.module';
import { WelcomeEmailModule } from '../welcome-email/welcome-email.module';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    MailConfirmationModule,
    TwoFactorModule,
    PasswordResetModule,
    WelcomeEmailModule,
    EmailChangeModule,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
