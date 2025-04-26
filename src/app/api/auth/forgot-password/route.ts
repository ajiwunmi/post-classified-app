// app/api/auth/forgot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import {User} from '@/models/User';
import { sendEmail } from '@/lib/sendEmail';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset?token=${token}`;
  try {
    await sendEmail(
      user.email,
      'Reset your password',
      `<p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`,
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Reset link sent, check yor email' });
}
