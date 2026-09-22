import { PreferenceRepository } from './preference.repository';

describe('PreferenceRepository (AC-09)', () => {
  const db = {
    notificationPreference: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
  };
  let repository: PreferenceRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new PreferenceRepository(db as never);
  });

  it('an unconfigured cell reads as enabled by default', async () => {
    db.notificationPreference.findUnique.mockResolvedValue(null);

    const result = await repository.isEnabled('u1', 'course.invite', 'EMAIL');

    expect(result).toBe(true);
    expect(db.notificationPreference.findUnique).toHaveBeenCalledWith({
      where: {
        userId_eventType_channel: {
          userId: 'u1',
          eventType: 'course.invite',
          channel: 'EMAIL',
        },
      },
    });
  });

  it('an explicit disable persists and is read back', async () => {
    db.notificationPreference.upsert.mockResolvedValue({
      id: 'p1',
      userId: 'u1',
      eventType: 'course.invite',
      channel: 'EMAIL',
      enabled: false,
    });
    db.notificationPreference.findUnique.mockResolvedValue({
      id: 'p1',
      userId: 'u1',
      eventType: 'course.invite',
      channel: 'EMAIL',
      enabled: false,
    });

    await repository.setEnabled('u1', 'course.invite', 'EMAIL', false);
    const result = await repository.isEnabled('u1', 'course.invite', 'EMAIL');

    expect(db.notificationPreference.upsert).toHaveBeenCalledWith({
      where: {
        userId_eventType_channel: {
          userId: 'u1',
          eventType: 'course.invite',
          channel: 'EMAIL',
        },
      },
      create: {
        userId: 'u1',
        eventType: 'course.invite',
        channel: 'EMAIL',
        enabled: false,
      },
      update: { enabled: false },
    });
    expect(result).toBe(false);
  });

  it('does not affect other event types or channels', async () => {
    db.notificationPreference.findUnique.mockResolvedValue(null);

    const result = await repository.isEnabled('u1', 'course.reminder', 'PUSH');

    expect(result).toBe(true);
  });
});
