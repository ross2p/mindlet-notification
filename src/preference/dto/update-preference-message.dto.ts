import type { UpdatePreferenceMessageType } from '@ross2p/types';

export class UpdatePreferenceMessageDto implements UpdatePreferenceMessageType {
  userId!: string;
  eventType!: string;
  channel!: UpdatePreferenceMessageType['channel'];
  enabled!: boolean;
}
