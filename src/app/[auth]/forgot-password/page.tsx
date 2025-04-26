'use client';
import { useState } from 'react';
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
     setLoading(true);

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    

    if (!res.ok) {
      setError(data.error);
      setMessage('');
       setLoading(false);
    } else {
      // setMessage(`Reset token (for dev): ${data.token}`);
       setMessage(data.message);
      setError('');
       setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md px-4">
          <div className="shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-gray-700 text-lg font-bold">
                  Forgot Password
                </h6>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-center mb-4 font-bold">
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-600 mb-2">{message}</p>}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded shadow focus:outline-none focus:ring text-sm transition duration-150"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg transition duration-150"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/login" className="text-blueGray-200">
                    <small>Back to Login</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
