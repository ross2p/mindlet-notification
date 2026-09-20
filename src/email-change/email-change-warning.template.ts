import { IEmailTemplate } from '../email/interfaces/email-template.interface';

export class EmailChangeWarningTemplate implements IEmailTemplate {
  constructor(private readonly newEmail: string) {}

  getHtml(): string {
    return `
            <html>
                <body>
                    <h2>Someone requested to change your account email</h2>
                    <p>A request was made to move your account to <strong>${this.newEmail}</strong>.</p>
                    <p>Your current email stays in effect until that address is confirmed. If you did not request this, no action is needed.</p>
                </body>
            </html>
        `;
  }

  getText(): string {
    return `Someone requested to change your account email
            A request was made to move your account to ${this.newEmail}.

            Your current email stays in effect until that address is confirmed. If you did not request this, no action is needed.
        `;
  }

  getSubject(): string {
    return 'A request was made to change your account email';
  }
}
