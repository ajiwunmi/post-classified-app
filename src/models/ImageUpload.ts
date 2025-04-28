import mongoose from 'mongoose';

const imageProperties = {
  image_url: { type: String },
  public_id: { type: String },
  user_id: String,
};

const ImageSchema = new mongoose.Schema(imageProperties, { timestamps: true });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
