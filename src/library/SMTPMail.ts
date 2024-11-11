import nodemailer, { TransportOptions, Transporter } from 'nodemailer';
import CreateError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { strings } from '../config';

interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  attachments?: {
    content: Buffer;
    filename: string;
    contentType: string;
    disposition: string;
  }[];
}

export class SMTPClient {
  private static transporter: Transporter;

  private static async createTransporter() {
    if (!process.env.SMTP_HOST) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'SMTP configuration is missing',
        { debug_info: { 
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER ? 'Set' : 'Not Set',
          pass: process.env.SMTP_PASSWORD ? 'Set' : 'Not Set'
        }}
      );
    }

    try {
      const transportConfig = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
        //logger: true,
        //debug: true
      } as TransportOptions;

      const transporter = nodemailer.createTransport(transportConfig);
      
      await transporter.verify();
      console.log('SMTP Connection verified successfully');
      
      return transporter;
    } catch (error) {
      console.error('Error creating SMTP transporter:', error);
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create SMTP transport',
        { debug_info: { error }}
      );
    }
  }

  private static async getTransporter(): Promise<Transporter> {
    if (!this.transporter) {
      this.transporter = await this.createTransporter();
    }
    return this.transporter;
  }

  private static formatString(template: string, params: Record<string, string>): string {
    return template.replace(/{(\w+)}/g, (match, key) => params[key] || match);
  }

  private static async send(message: EmailMessage): Promise<void> {
    try {
      const transporter = await this.getTransporter();
      console.log('Sending email with config:', {
        to: message.to,
        from: message.from,
        subject: message.subject
      });

      const result = await transporter.sendMail(message);
      console.log('Email sent successfully:', result);
    } catch(error) {
      console.error('Failed to send email:', error);
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to send email',
        { debug_info: { error, message }}
      );
    }
  }

  public static async sendRecoveryPassword(email: string, token: string): Promise<void> {
    if (!email || !token) {
      throw CreateError(
        StatusCodes.BAD_REQUEST,
        'Email and token are required',
        { debug_info: { email, tokenProvided: !!token }}
      );
    }

    if (!process.env.SMTP_FROM_EMAIL) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'SMTP_FROM_EMAIL is not configured',
        { debug_info: { availableEnv: process.env }}
      );
    }

    const message: EmailMessage = {
      to: email,
      from: process.env.SMTP_FROM_EMAIL,
      subject: strings.subjectRecoveryEmail,
      text: this.formatString(strings.textRecoveryEmail, {
        url: `${process.env.FE_RESET_PASSWORD_URL}/restablecer-contrasena`,
        token: token,
      }),
    };

    await SMTPClient.send(message);
  }

  public static async sendDeclarationFile(email: string, attachment: string): Promise<void> {
    if (!email || !attachment) {
      throw CreateError(
        StatusCodes.BAD_REQUEST,
        'Email and attachment are required',
        { debug_info: { email, attachmentProvided: !!attachment }}
      );
    }

    const now = new Date(Date.now());
    const today = now.toISOString();
    
    const message: EmailMessage = {
      to: email,
      from: process.env.SMTP_FROM_EMAIL || '',
      subject: strings.subjectDeclarationFile,
      text: strings.textDeclarationFile,
      attachments: [{
        content: Buffer.from(attachment, 'base64'),
        filename: `acuse-declaracion[${today}].pdf`,
        contentType: 'application/pdf',
        disposition: 'attachment'
      }]
    };

    await SMTPClient.send(message);
  }
}
