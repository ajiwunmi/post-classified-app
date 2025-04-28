// models/Ad.ts
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Product', 'Service'], required: true }, // Type of Ad
  category: { type: String, required: true },
  brandOrCompany: { type: String }, // Brand name (for products) or Company name (for services)
  specialization: { type: String }, // Product type or service specialization
  condition: {
    type: String,
    enum: ['New', 'Fairly Used', 'Service'],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number }, // Price or "Contact for Price"
  contactForPrice: { type: Boolean, default: false }, // User can request price
  negotiable: { type: Boolean, default: false },
  contactPhone: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  link: { type: String }, // Social media or business website
  delivery: {
    type: String,
    enum: ['Pickup', 'Delivery Available', 'Nationwide Delivery'],
    required: true,
  },
  promote: { type: Boolean, default: false }, // Promotion option
  images: [{ type: String }], // Image paths stored locally
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);
