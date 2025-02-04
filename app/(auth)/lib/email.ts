import { createTransport } from 'nodemailer';
import { createAuthMethod } from '@/app/(auth)/lib/db/queries';  // Assuming the token is stored as a credential in the AuthMethod table

const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Wrapper to send emails
async function sendEmail({ email, subject, url }: { email: string; subject: string; url: string }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: `Please complete your action by clicking the following link: ${url}`,
    html: `<p>Please complete your action by clicking the following link: <a href="${url}">${url}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${subject} email sent to:`, email);
  } catch (error) {
    console.error(`Error sending ${subject} email:`, error);
  }
}

// Send verification email to the user
export async function sendVerificationEmail(email: string, userId: string) {
  const token = await createAuthMethod(userId, 'validate-email'); // Fetch the token (credential) from AuthMethod table
  const verificationUrl = `https://account.internetfriends.xyz/verify-email?token=${token}`;
  await sendEmail({ email, subject: 'Verify your email address', url: verificationUrl });
}

// Send password reset email to the user
export async function sendResetPasswordEmail(email: string, userId: string) {
  const token = await createAuthMethod(userId, 'reset-password'); // Fetch the token (credential) from AuthMethod table
  const resetUrl = `https://account.internetfriends.xyz/reset-password?token=${token}`;
  await sendEmail({ email, subject: 'Reset your password', url: resetUrl });
}
