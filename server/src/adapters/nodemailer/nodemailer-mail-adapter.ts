import { SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer';
import { MailAdapter } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a9e693d8e8b6ce",
    pass: "7a1535fb6d566c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedback Widget Staff <response@feedcompany.com>',
      to: 'Matheus Souza <mgomesdesouzag@gmail.com>',
      subject,
      html: body,
    });
  }
}