'use client';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const categories = ['Electronics', 'Cars', 'Real Estate', 'Fashion'];

export default function AdForm() {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile!);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!,
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
      formData,
    );

    return res.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      !form.category ||
      !form.description ||
      !imageFile
    ) {
      setError('Please fill all fields + upload image');
      return;
    }

    setSubmitting(true);

    try {
      const imageUrl = await uploadToCloudinary();
      const adPayload = {
        ...form,
        image: imageUrl,
        userEmail: session?.user?.email,
      };

      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adPayload),
      });

      if (!res.ok) throw new Error('Ad creation failed');
      alert('✅ Ad posted!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post a New Ad</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Title/Price/Category/Desc */}
      {/* ... same as before */}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {imagePreview && (
          <img src={imagePreview} className="mt-4 w-40 h-40 object-cover" />
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {submitting ? 'Posting...' : 'Submit Ad'}
      </button>
    </form>
  );
}
