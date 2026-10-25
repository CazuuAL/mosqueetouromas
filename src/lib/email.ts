import { Resend } from 'resend';
import { getHelloAssoUrl } from '../config/helloasso';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private resend: Resend | null = null;

  constructor(apiKey: string) {
    if (apiKey && apiKey !== 'your-resend-api-key-here') {
      this.resend = new Resend(apiKey);
    }
  }

  async sendEmail(data: EmailData): Promise<boolean> {
    if (!this.resend) {
      console.warn('Resend API key not configured. Email not sent.');
      return false;
    }

    try {
      const result = await this.resend.emails.send({
        from: 'Mosquée Al Kawthar <onboarding@resend.dev>', // À remplacer par votre domaine vérifié
        to: data.to,
        subject: data.subject,
        html: data.html,
      });

      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Template pour confirmation d'inscription cours d'arabe
  getCoursArabeConfirmationEmail(data: {
    nom: string;
    prenom: string;
    typeCours: string;
    niveau: string;
    frais: number;
  }): string {
    const payUrl = getHelloAssoUrl('coursArabe');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #0d9488; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🕌 Mosquée Al Kawthar</h1>
            <p>Confirmation d'inscription</p>
          </div>
          <div class="content">
            <h2>As-salamu alaykum ${data.prenom},</h2>
            <p>Nous avons bien reçu votre inscription aux cours d'arabe. Voici le récapitulatif :</p>
            
            <div class="info-box">
              <h3>Informations de l'inscription</h3>
              <ul>
                <li><strong>Nom :</strong> ${data.nom} ${data.prenom}</li>
                <li><strong>Type de cours :</strong> ${data.typeCours}</li>
                <li><strong>Niveau :</strong> ${data.niveau}</li>
                <li><strong>Frais d'inscription :</strong> ${data.frais}€</li>
              </ul>
              <p style="color: #d97706; font-weight: bold;">⏳ En attente de paiement</p>
            </div>

            <div class="info-box" style="border-left-color: #d97706;">
              <h3>💳 Finaliser le paiement</h3>
              <p>Merci de régler les frais d'inscription via HelloAsso :</p>
              <p style="text-align: center; margin: 16px 0;">
                <a href="${payUrl}" style="background-color: #0d9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Payer maintenant</a>
              </p>
              <p>Vous pouvez aussi nous contacter directement :</p>
              <ul>
                <li>Téléphone : <a href="tel:+33778841852">+33 7 78 84 18 52</a></li>
                <li>Email : <a href="mailto:mosqueespdc71@gmail.com">mosqueespdc71@gmail.com</a></li>
              </ul>
            </div>

            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Barakallahu fik !</p>
          </div>
          <div class="footer">
            <p><strong>Mosquée Al Kawthar</strong></p>
            <p>71 rue de la Rabaterie, 37700 Saint-Pierre-des-Corps</p>
            <p>📞 +33 7 78 84 18 52 | ✉️ mosqueespdc71@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Template pour confirmation d'inscription stage intensif
  getStageConfirmationEmail(data: {
    nom: string;
    prenom: string;
    typeStage: string;
    montant: number;
  }): string {
    const payUrl = getHelloAssoUrl('stages');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #0d9488; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🕌 Mosquée Al Kawthar</h1>
            <p>Confirmation d'inscription au stage</p>
          </div>
          <div class="content">
            <h2>As-salamu alaykum ${data.prenom},</h2>
            <p>Nous avons bien reçu votre inscription au stage intensif. Voici le récapitulatif :</p>
            
            <div class="info-box">
              <h3>Informations de l'inscription</h3>
              <ul>
                <li><strong>Nom :</strong> ${data.nom} ${data.prenom}</li>
                <li><strong>Type de stage :</strong> ${data.typeStage}</li>
                <li><strong>Montant :</strong> ${data.montant}€</li>
              </ul>
              <p style="color: #d97706; font-weight: bold;">⏳ En attente de paiement</p>
            </div>

            <div class="info-box" style="border-left-color: #d97706;">
              <h3>💳 Finaliser le paiement</h3>
              <p>Merci de régler le montant du stage via HelloAsso :</p>
              <p style="text-align: center; margin: 16px 0;">
                <a href="${payUrl}" style="background-color: #0d9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Payer maintenant</a>
              </p>
              <p>Vous pouvez aussi nous contacter directement :</p>
              <ul>
                <li>Téléphone : <a href="tel:+33778841852">+33 7 78 84 18 52</a></li>
                <li>Email : <a href="mailto:mosqueespdc71@gmail.com">mosqueespdc71@gmail.com</a></li>
              </ul>
            </div>

            <p>Nous vous enverrons plus d'informations sur le stage avant la date de début.</p>
            <p>Barakallahu fik !</p>
          </div>
          <div class="footer">
            <p><strong>Mosquée Al Kawthar</strong></p>
            <p>71 rue de la Rabaterie, 37700 Saint-Pierre-des-Corps</p>
            <p>📞 +33 7 78 84 18 52 | ✉️ mosqueespdc71@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
