import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcRequest, ValidationPipe } from '@ross2p/common';
import { NotificationCoreProto } from '../../generated/protos';
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
    @GrpcRequest(
      new ValidationPipe<SendMailConfirmationDto>(mailConfirmationSchema),
    )
    data: SendMailConfirmationDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.mailConfirmationService.sendConfirmationEmail(
      data.userId,
      data.code,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendTwoFactor')
  public async sendTwoFactor(
    @GrpcRequest(new ValidationPipe<SendTwoFactorDto>(twoFactorSchema))
    data: SendTwoFactorDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.twoFactorService.sendTwoFactor(
      data.provider,
      data.userId,
      data.code,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendPasswordReset')
  public async sendPasswordReset(
    @GrpcRequest(
      new ValidationPipe<SendPasswordResetDto>(sendPasswordResetSchema),
    )
    data: SendPasswordResetDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.passwordResetService.sendPasswordResetEmail(
      data.userId,
      data.token,
    );
    return {};
  }

  @GrpcMethod('NotificationService', 'sendWelcome')
  public async sendWelcome(
    @GrpcRequest(
      new ValidationPipe<SendWelcomeEmailDto>(sendWelcomeEmailSchema),
    )
    data: SendWelcomeEmailDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.welcomeEmailService.sendWelcomeEmail(data.userId);
    return {};
  }

  @GrpcMethod('NotificationService', 'sendEmailChangeCode')
  public async sendEmailChangeCode(
    @GrpcRequest(
      new ValidationPipe<SendEmailChangeCodeDto>(sendEmailChangeCodeSchema),
    )
    data: SendEmailChangeCodeDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.emailChangeService.sendChangeCode(data.email, data.code);
    return {};
  }

  @GrpcMethod('NotificationService', 'sendEmailChangeWarning')
  public async sendEmailChangeWarning(
    @GrpcRequest(
      new ValidationPipe<SendEmailChangeWarningDto>(
        sendEmailChangeWarningSchema,
      ),
    )
    data: SendEmailChangeWarningDto,
  ): Promise<NotificationCoreProto.Empty> {
    await this.emailChangeService.sendChangeWarning(data.email, data.newEmail);
    return {};
  }
}
