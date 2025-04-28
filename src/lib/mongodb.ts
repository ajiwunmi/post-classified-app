// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('⚠️ MONGODB_URI not defined in .env');
}

type mongoType = {
  conn: string;
  promise: string;
};

const cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      } as any)
      .then((mongoose) => mongoose)
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
