import { PreferenceService } from './preference.service';

describe('PreferenceService (AC-09/10)', () => {
  const repository = {
    isEnabled: jest.fn(),
    setEnabled: jest.fn(),
    findAllForUser: jest.fn(),
  };
  let service: PreferenceService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PreferenceService(repository as never);
  });

  it('toggling one cell only touches that (userId, eventType, channel)', async () => {
    repository.setEnabled.mockResolvedValue({
      id: 'p1',
      userId: 'u1',
      eventType: 'course.reminder',
      channel: 'EMAIL',
      enabled: false,
    });

    await service.updatePreference('u1', 'course.reminder', 'EMAIL', false);

    expect(repository.setEnabled).toHaveBeenCalledTimes(1);
    expect(repository.setEnabled).toHaveBeenCalledWith(
      'u1',
      'course.reminder',
      'EMAIL',
      false,
    );
  });

  describe('shouldDispatch (dispatch-time filter)', () => {
    it('skips a muted channel', async () => {
      repository.isEnabled.mockResolvedValue(false);

      const result = await service.shouldDispatch(
        'u1',
        'course.reminder',
        'EMAIL',
      );

      expect(result).toBe(false);
    });

    it('allows an unmuted channel, matching the opt-out default', async () => {
      repository.isEnabled.mockResolvedValue(true);

      const result = await service.shouldDispatch('u1', 'team.invite', 'PUSH');

      expect(result).toBe(true);
    });

    it('is a pure read with no side effects on the triggering event', async () => {
      repository.isEnabled.mockResolvedValue(false);

      await service.shouldDispatch('u1', 'course.reminder', 'EMAIL');

      expect(repository.setEnabled).not.toHaveBeenCalled();
    });
  });
});
