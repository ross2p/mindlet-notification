import { PreferenceController } from './preference.controller';

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
    await controller.getPreferences({ userId: 'u1' });
    expect(preferenceService.getPreferences).toHaveBeenCalledWith('u1');
  });

  it('forwards update requests', async () => {
    await controller.updatePreference({
      userId: 'u1',
      eventType: 'course.reminder',
      channel: 'EMAIL',
      enabled: false,
    });

    expect(preferenceService.updatePreference).toHaveBeenCalledWith(
      'u1',
      'course.reminder',
      'EMAIL',
      false,
    );
  });
});
