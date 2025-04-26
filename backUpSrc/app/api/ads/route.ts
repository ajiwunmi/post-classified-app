// app/api/ads/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Ad } from '@/models/Ad';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  if (!body.title || !body.price || !body.category || !body.description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newAd = await Ad.create(body);
  return NextResponse.json(
    { message: 'Ad created', ad: newAd },
    { status: 201 },
  );
}

export async function GET() {
  await connectDB();
  const ads = await Ad.find().sort({ createdAt: -1 });
  return NextResponse.json({ ads });
}
