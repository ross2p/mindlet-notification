import { NotificationPreferenceProto } from '@ross2p/common';
import { PreferenceController } from './preference.controller';

const USER_ID = '018f0000-0000-7000-8000-000000000001';

describe('PreferenceController wiring (AC-09)', () => {
  const preferenceService = {
    getPreferences: jest.fn(),
    updatePreference: jest.fn(),
  };
  const controller = new PreferenceController(preferenceService as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards get requests', async () => {
    preferenceService.getPreferences.mockResolvedValue([]);
    const result = await controller.listPreferences({ userId: 'u1' });
    expect(preferenceService.getPreferences).toHaveBeenCalledWith('u1');
    expect(result).toEqual({ preferences: [] });
  });

  it('forwards update requests', async () => {
    await controller.updatePreference({
      userId: USER_ID,
      eventType: 'course.reminder',
      channel: NotificationPreferenceProto.NotificationChannel.EMAIL,
      enabled: false,
    });

    expect(preferenceService.updatePreference).toHaveBeenCalledWith(
      USER_ID,
      'course.reminder',
      'EMAIL',
      false,
    );
  });
});
