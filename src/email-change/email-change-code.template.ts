import { IEmailTemplate } from '../email/interfaces/email-template.interface';

export class EmailChangeCodeTemplate implements IEmailTemplate {
  constructor(private readonly code: string) {}

  getHtml(): string {
    return `
            <html>
                <body>
                    <h2>Confirm your new email address</h2>
                    <p>Your confirmation code is: <strong>${this.code}</strong></p>
                    <p>Enter this code to finish moving your account to this address.</p>
                </body>
            </html>
        `;
  }

  getText(): string {
    return `Confirm your new email address
            Your confirmation code is: ${this.code}

            Enter this code to finish moving your account to this address.
        `;
  }

  getSubject(): string {
    return 'Confirm your new email address';
  }
}
