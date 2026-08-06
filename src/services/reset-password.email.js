import { BrevoClient } from '@getbrevo/brevo';

export async function sendResetPasswordEmail(userEmail, resetUrl) {
  const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Joba - Password Reset!',
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email: userEmail }],
      htmlContent: `
                <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FFEFE3; margin: 0; padding: 20px; }
            .container { max-width: 500px; background: #ffffff; margin: 0 auto; padding: 32px; border-radius: 24px; border: 1px solid rgba(0,0,0,0.05); }
            .header { text-align: center; font-weight: 900; font-size: 24px; color: #2D2321; text-transform: uppercase; margin-bottom: 24px; }
            .highlight { color: #FF84BA; }
            .btn { display: inline-block; width: 100%; text-align: center; background-color: #FF84BA; color: #ffffff !important; font-weight: bold; padding: 14px 0; border-radius: 16px; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin: 20px 0; }
            .footer { font-size: 11px; color: #888888; text-align: center; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">JOBA</div>
            <p style="font-size: 14px; color: #2D2321; font-weight: bold;">Halo,</p>
            <p style="font-size: 13px; color: #666666; line-height: 1.5;">
              We received about reset password. Click link below to reset password:
            </p>
            <a href="${resetUrl}" class="btn" target="_blank">Reset My Password</a>
            <p style="font-size: 12px; color: #888888; line-height: 1.4;">
              This link only available <strong>1 hours</strong>. If you don't want this access, please ignore it.
            </p>
            <div class="footer">
              © 2026 JOBA. All Rights Reserved.
            </div>
          </div>
        </body>
      </html>
            `,
    });
  } catch (error) {
    console.error('Failed send reset password', error);
  }
}

export default sendResetPasswordEmail;
