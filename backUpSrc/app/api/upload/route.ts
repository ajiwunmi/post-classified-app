// app/api/upload/route.ts

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Use next-connect or custom file parser here
// Then send file to: cloudinary.uploader.upload(filePath)
