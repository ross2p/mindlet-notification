import { Injectable } from '@nestjs/common';
import { IEmailTemplate } from '../email/interfaces/email-template.interface';

@Injectable()
export class TwoFactorTemplate implements IEmailTemplate {
  private readonly verificationCode: string;
  constructor(verificationCode: string) {
    this.verificationCode = verificationCode;
  }
  getHtml(): string {
    return `
            <html>
                <body>
                    <h2>Two-Factor Authentication</h2>
                    <p>Your verification code is: <strong>${this.verificationCode}</strong></p>
                    <p>Please enter this code to complete your login.</p>
                </body>
            </html>
        `;
  }

  getText(): string {
    return `Two-Factor Authentication
            Your verification code is: ${this.verificationCode}

            Please enter this code to complete your login.
        `;
  }
  getSubject(): string {
    return 'Two-Factor Authentication';
  }
}
