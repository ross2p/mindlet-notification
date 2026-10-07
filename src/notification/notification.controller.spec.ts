import { NotificationCoreProto } from '@ross2p/common';
import { NotificationController } from './notification.controller';

const USER_ID = '018f0000-0000-7000-8000-000000000001';

describe('NotificationController (gRPC)', () => {
  const mailConfirmationService = { sendConfirmationEmail: jest.fn() };
  const twoFactorService = { sendTwoFactor: jest.fn() };
  const passwordResetService = { sendPasswordResetEmail: jest.fn() };
  const welcomeEmailService = { sendWelcomeEmail: jest.fn() };
  const emailChangeService = {
    sendChangeCode: jest.fn(),
    sendChangeWarning: jest.fn(),
  };
  const controller = new NotificationController(
    mailConfirmationService as never,
    twoFactorService as never,
    passwordResetService as never,
    welcomeEmailService as never,
    emailChangeService as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards the mail confirmation code and replies Empty', async () => {
    const result = await controller.sendMailConfirmation({
      userId: USER_ID,
      code: '123456',
    });

    expect(mailConfirmationService.sendConfirmationEmail).toHaveBeenCalledWith(
      USER_ID,
      '123456',
    );
    expect(result).toEqual({});
  });

  it('forwards the two-factor code with the provider enum', async () => {
    await controller.sendTwoFactor({
      userId: USER_ID,
      code: '123456',
      provider: NotificationCoreProto.Provider.EMAIL,
    });

    expect(twoFactorService.sendTwoFactor).toHaveBeenCalledWith(
      'EMAIL',
      USER_ID,
      '123456',
    );
  });

  it('forwards the password reset token', async () => {
    await controller.sendPasswordReset({ userId: USER_ID, token: 'tok' });

    expect(passwordResetService.sendPasswordResetEmail).toHaveBeenCalledWith(
      USER_ID,
      'tok',
    );
  });

  it('forwards the email-change code and warning', async () => {
    await controller.sendEmailChangeCode({
      email: 'new@example.test',
      code: '123456',
    });
    await controller.sendEmailChangeWarning({
      email: 'old@example.test',
      newEmail: 'new@example.test',
    });

    expect(emailChangeService.sendChangeCode).toHaveBeenCalledWith(
      'new@example.test',
      '123456',
    );
    expect(emailChangeService.sendChangeWarning).toHaveBeenCalledWith(
      'old@example.test',
      'new@example.test',
    );
  });
});
