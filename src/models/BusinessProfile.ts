import mongoose from "mongoose";

const BusinessProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  website: { type: String },
  logo: { type: String }, // URL or path to the business logo
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Business rating from 0 to 5
  businessType: { type: String },
  media: [{ type: String }], // Array for multiple images/videos
  contactFormEnabled: { type: Boolean, default: false }, // Toggle for contact form
  ownerName: { type: String },
  paymentMethods: [String], // Array for accepted payment methods (e.g., 'Credit Card', 'PayPal')
  certification: { type: String }, // Business certifications or licenses
  testimonials: [
    {
      customerName: { type: String },
      message: { type: String },
      rating: { type: Number },
    },
  ],
  socialLinks: [
    {
      platform: { type: String }, // e.g., 'Facebook', 'Twitter'
      link: { type: String }, // URL for the social media page
    },
  ],
  ads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ad" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.BusinessProfile || mongoose.model("BusinessProfile", BusinessProfileSchema);
