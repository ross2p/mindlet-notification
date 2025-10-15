import { IEmailTemplate } from '../base-email/interfaces/email-template.interface';

export class MailConfirmationTemplate implements IEmailTemplate {
  private readonly confirmationCode: string;
  constructor(confirmationCode: string) {
    this.confirmationCode = confirmationCode;
  }
  getHtml(): string {
    return `
            <html>
                <body>
                    <h2>Email Confirmation</h2>
                    <p>Your confirmation code is: <strong>${this.confirmationCode}</strong></p>
                    <p>Please enter this code to confirm your email address.</p>
                </body>
            </html>
        `;
  }

  getText(): string {
    return `Email Confirmation
            Your confirmation code is: ${this.confirmationCode}

            Please enter this code to confirm your email address.
        `;
  }
  getSubject(): string {
    return 'Email Confirmation';
  }
}
