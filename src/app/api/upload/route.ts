// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Image  from '@/models/ImageUpload';

export async function POST(req: Request) {
    
  const { image_url, public_id, user_id } = await req.json();

  if (!image_url || !public_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

   try {
     await connectDB();
     const newImage = await Image.create({
       image_url,
       public_id,
       user_id,
     });

     return NextResponse.json( { message: 'Image uploaded successfully', image: newImage }, { status: 201 });
   } catch (err) {
     console.error(err);
     return NextResponse.json({ error: 'Database error' }, { status: 500 });
   }
  

  
}
