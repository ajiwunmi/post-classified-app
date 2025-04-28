// models/Ad.ts
import mongoose, { Schema } from 'mongoose';

const AdSchema = new Schema(
  {
    title: String,
    price: String,
    category: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export const Ad = mongoose.models.Ad || mongoose.model('Ad', AdSchema);
