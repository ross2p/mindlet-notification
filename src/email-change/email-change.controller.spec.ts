import { EmailChangeController } from './email-change.controller';

describe('EmailChangeController wiring (AC-16)', () => {
  const emailChangeService = {
    sendChangeCode: jest.fn(),
    sendChangeWarning: jest.fn(),
  };
  const controller = new EmailChangeController(emailChangeService as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards the code email to EmailChangeService', async () => {
    await controller.sendChangeCode({
      email: 'new@example.test',
      code: '123456',
    });

    expect(emailChangeService.sendChangeCode).toHaveBeenCalledWith(
      'new@example.test',
      '123456',
    );
  });

  it('forwards the warning email to EmailChangeService', async () => {
    await controller.sendChangeWarning({
      email: 'old@example.test',
      newEmail: 'new@example.test',
    });

    expect(emailChangeService.sendChangeWarning).toHaveBeenCalledWith(
      'old@example.test',
      'new@example.test',
    );
  });
});
