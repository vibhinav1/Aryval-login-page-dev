import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 

const prisma = new PrismaClient();

export async function POST(req) {
  const { token, newPassword } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRecord) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token.' }),
        { status: 400 }
      );
    }

    const now = new Date();
    if (resetRecord.expires < now) {
      return new Response(
        JSON.stringify({ error: 'Token has expired.' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); 

    await prisma.account.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({
      where: { token },
    });

    return new Response(
      JSON.stringify({ message: 'Password reset successful.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or expired token.' }),
      { status: 400 }
    );
  }
}
