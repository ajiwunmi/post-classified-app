// app/api/ads/route.ts
import { NextResponse } from 'next/server';

let ads: any[] = []; // In-memory mock DB

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.price || !body.category || !body.description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newAd = {
    id: Date.now(),
    ...body,
  };

  ads.push(newAd);

  return NextResponse.json(
    { message: 'Ad created', ad: newAd },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ ads });
}
