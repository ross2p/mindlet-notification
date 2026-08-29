import { IEmailTemplate } from '../email/interfaces/email-template.interface';

export class PasswordResetTemplate implements IEmailTemplate {
  constructor(private readonly token: string) {}

  getHtml(): string {
    return `
            <html>
                <body>
                    <h2>Password Reset</h2>
                    <p>Your password reset token is: <strong>${this.token}</strong></p>
                    <p>Use this token to reset your password. If you did not request a reset, ignore this email.</p>
                </body>
            </html>
        `;
  }

  getText(): string {
    return `Password Reset
            Your password reset token is: ${this.token}

            Use this token to reset your password. If you did not request a reset, ignore this email.
        `;
  }

  getSubject(): string {
    return 'Password Reset';
  }
}
