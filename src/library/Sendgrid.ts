import CreateError from 'http-errors';
// import Sendgrid from '@sendgrid/mail';
import { StatusCodes } from 'http-status-codes';
import { strings } from '../config';
import nodemailer from  'nodemailer';
// import Mail from "nodemailer/lib/mailer"

//  04/05/2023: Se dejan los nombres de los métodos pero se cambia la funcionalidad para
// eliminar la necesidad de usar sendgrid y poder usar un servidor de correo SMTP
export class SendgridClient {
  


  private static async send(message: any): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        host: `${process.env.CORREO_SERVIDOR}`,
        port: parseInt(`${process.env.CORREO_PUERTO}`),
        secure: false,
        requireTLS: true,
        auth: {
          user: `${process.env.CORREO_USUARIO}`,
          pass: `${process.env.CORREO_CONTRASENA}`
        },
        logger: true,
        tls: {
          rejectUnauthorized: false
        }
      });

      await transporter.sendMail(message);

      return true;
    } catch(e: any) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        e,
        {debug_info: {error: e}},
      );
    }
  }

  public static async sendRecoveryPassword(email: string, token: string): Promise<boolean> {
    const message = {
      to: email,
      from: `${process.env.CORREO_USUARIO}`,
      subject: strings.subjectRecoveryEmail,
      text: strings.formatString(strings.textRecoveryEmail, {
        url: `${process.env.FE_RESET_PASSWORD_URL}/restablecer-contrasena`,
        token: token,
      }),
    };

    return await SendgridClient.send(message);
  }

  public static async sendDeclarationFile(email: string, attachment: any): Promise<boolean> {
    const now = new Date(Date.now());
    const today = now.toISOString();
    const message = {
      to: email,
      from: `${process.env.CORREO_USUARIO}`,
      subject: strings.subjectDeclarationFile,
      text: strings.textDeclarationFile,
      attachments: [{
        content: attachment,
        filename: `acuse-declaracion[${today}].pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }]
    };

    return await SendgridClient.send(message);
  }
}
