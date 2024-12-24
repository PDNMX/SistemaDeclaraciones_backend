import { SMTPClient } from './SMTPMail';
import { SendgridClient } from './Sendgrid';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
class EmailService {
  private static instance: EmailService;
  private readonly useSmtp: boolean;

  private constructor() {
    const useSmtpValue = process.env.USE_SMTP;
    this.useSmtp = useSmtpValue === 'true';
    
    // verificar que configuración es la que se carga segun el valor de USE_SMTP
    /* console.log('Configuración del servicio de correo:');
    console.log('USE_SMTP:', useSmtpValue);
    console.log('Servicio seleccionado:', this.useSmtp ? 'SMTP' : 'SendGrid'); */
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendDeclarationFile(email: string, fileContent: string): Promise<void> {
    console.log(`Enviando archivo usando servicio: ${this.useSmtp ? 'SMTP' : 'SendGrid'}`);
    if (this.useSmtp) {
      await SMTPClient.sendDeclarationFile(email, fileContent);
    } else {
      await SendgridClient.sendDeclarationFile(email, fileContent);
    }
  }

  public async sendRecoveryPassword(email: string, token: string): Promise<void> {
    console.log(`Enviando recuperación de contraseña usando servicio: ${this.useSmtp ? 'SMTP' : 'SendGrid'}`);
    if (this.useSmtp) {
      await SMTPClient.sendRecoveryPassword(email, token);
    } else {
      await SendgridClient.sendRecoveryPassword(email, token);
    }
  }
}

export const emailService = EmailService.getInstance();