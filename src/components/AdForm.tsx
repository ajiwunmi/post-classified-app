// components/AdForm.tsx
'use client';

import { useState } from 'react';

const categories = ['Electronics', 'Cars', 'Real Estate', 'Fashion'];

export default function AdForm() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Simple validation
//     if (!form.title || !form.price || !form.category || !form.description) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setError('');
//     setSubmitted(true);

//     setTimeout(() => {
//       alert('✅ Ad submitted successfully (mock)!');
//       setSubmitted(false);
//     }, 1000);
//   };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.title || !form.price || !form.category || !form.description) {
    setError('Please fill in all fields');
    return;
  }

  setError('');
  setSubmitted(true);

  try {
    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || 'Unknown error');

    alert('✅ Ad submitted successfully!');
    setForm({ title: '', price: '', category: '', description: '', image: '' });
  } catch (err: any) {
    setError(err.message);
  } finally {
    setSubmitted(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post a New Ad</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Image (URL for now)
        </label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={submitted}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {submitted ? 'Submitting...' : 'Submit Ad'}
      </button>
    </form>
  );
}
