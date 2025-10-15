import { IEmailTemplate } from '../base-email/interfaces/email-template.interface';

export class WelcomeEmailTemplateDto implements IEmailTemplate {
  constructor(private readonly userName: string) {}

  getHtml(): string {
    return `<p>Welcome ${this.userName} to our service!</p>`;
  }

  getText(): string {
    return `Welcome ${this.userName} to our service!`;
  }

  getSubject(): string {
    return `Welcome ${this.userName}!`;
  }
}
