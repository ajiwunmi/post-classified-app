// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  await connectDB();
  const {
    name,
    email,
    password,
    confirm_password,
    role = 'user',
  } = await req.json();

  if (!name || !email || !password || !confirm_password) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  }

  if (password !== confirm_password) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 }
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashed, role });

  return NextResponse.json({ message: 'User created', userId: newUser._id });
}
