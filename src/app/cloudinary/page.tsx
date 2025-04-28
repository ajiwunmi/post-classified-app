'use client';

import { CldUploadButton } from 'next-cloudinary';
import { POST } from '@/app/api/upload/route';

export default function CloudinaryPage() {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

  const userId = '1';
  const folderName = `classified-ads/user-${userId}/products`;

  const handleUpload = async (results: any) => {
    console.log(results);
    const imageUrl = results?.info?.secure_url;
    const publicId = results?.info?.public_id;
    if (!imageUrl || !publicId) {
      console.error('Missing Cloudinary upload info.');
      return;
    }
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          public_id: publicId,
          user_id: userId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save image data to database');
      }

      const data = res.json();
      console.log('Saved image to DB:', data);
    } catch (error) {
      console.error('Upload handling failed:', error);
    }
  };

  return (
    <div>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <CldUploadButton
          uploadPreset={preset}
          options={{ folder: folderName }}
          onSuccess={handleUpload}
        />
      </main>
    </div>
  );
}
