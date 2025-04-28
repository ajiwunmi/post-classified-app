// pages/api/auth/reset-password.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

interface ResetBody {
  token: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Connect to Mongo
    await connectDB();

    // 2. Parse and type-check body
    const { token, password } = (await req.json()) as ResetBody;
    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and new password are required.' },
        { status: 400 }
      );
    }

    // 3. Find the user by resetToken and ensure it hasn't expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Token is invalid or has expired.' },
        { status: 400 }
      );
    }

    // 4. Hash the new password
    const hashed = await bcrypt.hash(password, 10);

    // 5. Update user record
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset. You can now log in.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
