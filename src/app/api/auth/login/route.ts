import { connectDB } from '@/lib/mongodb';
import {User} from '@/models/User';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req : NextRequest) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
    );

    return NextResponse.json(
      { message: 'Login successful', user, token },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
