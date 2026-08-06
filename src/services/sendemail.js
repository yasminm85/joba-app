import { BrevoClient } from '@getbrevo/brevo';

export async function sendVerificationEmail(email, verifyUrl) {
  const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Joba - Verify Email!',
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email: email }],
      htmlContent: `
                <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #FFEFE3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 480px; background-color: #ffffff; border-radius: 24px; border: 1px solid rgba(0, 0, 0, 0.05); overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="padding: 36px 32px 20px 32px;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #2D2321; letter-spacing: -0.5px; text-transform: uppercase;">
                  JOBA
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 32px 32px 32px; text-align: center;">
                <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #2D2321; text-transform: uppercase; letter-spacing: -0.2px;">
                  Verify Your Email Address
                </h2>
                <p style="margin: 0 0 28px 0; font-size: 13px; line-height: 1.6; color: #665E5C; font-weight: 500;">
                  Thank you for signing up with JOBA! Please click the button below to verify your email address and activate your account.
                </p>

                <a href="${verifyUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #FF84BA; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 16px; box-shadow: 0 4px 12px rgba(255, 132, 186, 0.35);">
                  Verify Email Address
                </a>

                <p style="margin: 28px 0 0 0; font-size: 11px; color: #9E9694; line-height: 1.5;">
                  This verification link will expire in <strong>24 hours</strong>.<br>
                  If you didn't create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 32px;">
                <div style="border-top: 1px solid #F3ECE7;"></div>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px 32px 32px 32px; text-align: left;">
                <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #9E9694; letter-spacing: 0.5px;">
                  Having trouble with the button?
                </p>
                <p style="margin: 0; font-size: 11px; color: #FF84BA; word-break: break-all; line-height: 1.4;">
                  <a href="${verifyUrl}" style="color: #FF84BA; text-decoration: underline;">${verifyUrl}</a>
                </p>
              </td>
            </tr>

          </table>

          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 480px; margin-top: 20px;">
            <tr>
              <td align="center" style="font-size: 10px; color: #8A7E7B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                &copy; ${new Date().getFullYear()} JOBA. All rights reserved.
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
            `,
    });
  } catch (error) {
    console.error('Failed send reset password', error);
  }
}

export default sendVerificationEmail;
