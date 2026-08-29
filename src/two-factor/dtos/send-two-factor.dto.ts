import { Provider } from '../../provider.enum';

export class SendTwoFactorDto {
  userId!: string;
  code!: string;
  provider!: Provider;
}
