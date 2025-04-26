// app/auth/reset/page.tsx
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => router.push('/auth/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <div className="shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t px-6 py-6">
            <div className="text-center mb-3">
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              {message && <p className="mt-2">{message}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  className="border p-2 w-full mb-4"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
