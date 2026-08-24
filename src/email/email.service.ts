import { Injectable } from '@nestjs/common';
import { EmailDto } from './dtos/email.dto';
import { IEmailTemplate } from './interfaces/email-template.interface';

@Injectable()
export class EmailService {
  private async sendEmail(to: string, emailDto: EmailDto): Promise<void> {
    //todo: implement actual email sending logic using nodemailer or any email service provider
    console.log(`Sending email to ${to} with subject ${emailDto.subject}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Email sent successfully');
  }

  async sendEmailWithTemplate(
    to: string,
    template: IEmailTemplate,
  ): Promise<void> {
    const emailDto: EmailDto = {
      subject: template.getSubject(),
      text: template.getText(),
      html: template.getHtml(),
    };
    await this.sendEmail(to, emailDto);
  }
}
