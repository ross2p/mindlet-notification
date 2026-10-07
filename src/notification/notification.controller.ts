import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationCoreProto, ValidationPipe } from '@ross2p/common';
import { SendEmailChangeCodeDto } from '../email-change/dtos/send-email-change-code.dto';
import { SendEmailChangeWarningDto } from '../email-change/dtos/send-email-change-warning.dto';
import {
  sendEmailChangeCodeSchema,
  sendEmailChangeWarningSchema,
} from '../email-change/email-change.schema';
import { EmailChangeService } from '../email-change/email-change.service';
import { SendMailConfirmationDto } from '../mail-confirmation/dtos/send-mail-confirmation.dto';
import { mailConfirmationSchema } from '../mail-confirmation/mail-confirmation.schema';
import { MailConfirmationService } from '../mail-confirmation/mail-confirmation.service';
import { SendPasswordResetDto } from '../password-reset/dtos/send-password-reset.dto';
import { sendPasswordResetSchema } from '../password-reset/password-reset.schema';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { SendTwoFactorDto } from '../two-factor/dtos/send-two-factor.dto';
import { twoFactorSchema } from '../two-factor/two-factor.schema';
import { TwoFactorService } from '../two-factor/two-factor.service';
import { SendWelcomeEmailDto } from '../welcome-email/dtos/send-welcome-email.dto';
import { sendWelcomeEmailSchema } from '../welcome-email/welcome-email.schema';
import { WelcomeEmailService } from '../welcome-email/welcome-email.service';

@Controller()
export class NotificationController
  implements NotificationCoreProto.NotificationServiceController
{
  constructor(
    private readonly mailConfirmationService: MailConfirmationService,
    private readonly twoFactorService: TwoFactorService,
    private readonly passwordResetService: PasswordResetService,
    private readonly welcomeEmailService: WelcomeEmailService,
    private readonly emailChangeService: EmailChangeService,
  ) {}

  @GrpcMethod('NotificationService', 'sendMailConfirmation')
  public async sendMailConfirmation(
    request: NotificationCoreProto.SendMailConfirmationRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendMailConfirmationDto>(
      mailConfirmationSchema,
    ).transform(request);
    await this.mailConfirmationService.sendConfirmationEmail(
      data.userId,
      data.code,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendTwoFactor')
  public async sendTwoFactor(
    request: NotificationCoreProto.SendTwoFactorRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendTwoFactorDto>(
      twoFactorSchema,
    ).transform(request);
    await this.twoFactorService.sendTwoFactor(
      data.provider,
      data.userId,
      data.code,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendPasswordReset')
  public async sendPasswordReset(
    request: NotificationCoreProto.SendPasswordResetRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendPasswordResetDto>(
      sendPasswordResetSchema,
    ).transform(request);
    await this.passwordResetService.sendPasswordResetEmail(
      data.userId,
      data.token,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendWelcome')
  public async sendWelcome(
    request: NotificationCoreProto.SendWelcomeRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendWelcomeEmailDto>(
      sendWelcomeEmailSchema,
    ).transform(request);
    await this.welcomeEmailService.sendWelcomeEmail(data.userId);
    return {};
  }

  @GrpcMethod('NotificationService', 'sendEmailChangeCode')
  public async sendEmailChangeCode(
    request: NotificationCoreProto.SendEmailChangeCodeRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendEmailChangeCodeDto>(
      sendEmailChangeCodeSchema,
    ).transform(request);
    await this.emailChangeService.sendChangeCode(data.email, data.code);
    return {};
  }

  @GrpcMethod('NotificationService', 'sendEmailChangeWarning')
  public async sendEmailChangeWarning(
    request: NotificationCoreProto.SendEmailChangeWarningRequest,
  ): Promise<NotificationCoreProto.Empty> {
    const data = new ValidationPipe<SendEmailChangeWarningDto>(
      sendEmailChangeWarningSchema,
    ).transform(request);
    await this.emailChangeService.sendChangeWarning(data.email, data.newEmail);
    return {};
  }
}
