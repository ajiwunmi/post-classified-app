// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isVerified?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const userProperties = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
};

const UserSchema = new Schema<IUser>(userProperties, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
