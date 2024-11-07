import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { ServerClient } from 'postmark';

const prisma = new PrismaClient();
const client = new ServerClient(process.env.POSTMARK_API_KEY);

const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const sendResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

  try {
    await client.sendEmail({
      From: 'vbhagat@academic.rrc.ca', 
      To: email,
      Subject: 'Password Reset Request',
      HtmlBody: `
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
      TextBody: `We received a request to reset your password. Please click the link below to reset your password: ${resetLink}`,
    });
  } catch (error) {
    console.error('Error sending reset email with Postmark:', error);
    throw new Error('Failed to send password reset email.');
  }
};

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address.' }),
      { status: 400 }
    );
  }

  try {
    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) {
      return new Response(
        JSON.stringify({ error: 'User not found.' }),
        { status: 404 }
      );
    }

    const resetToken = generateResetToken(email);

    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
        expires: new Date(Date.now() + 3600 * 1000), // Token expires in 1 hour
      },
    });
    
    await sendResetEmail(email, resetToken);

    return new Response(
      JSON.stringify({ message: 'Password reset link sent to your email.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in sending reset link:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send password reset email.' }),
      { status: 500 }
    );
  }
}
