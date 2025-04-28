'use client';
////app/components/header.tsx
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TeorMarket</h1>

        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/listings">Listings</Link>
          {session?.user ? (
            <>
              {(session.user as any).role === 'admin' && (
                <Link href="/admin">Admin</Link>
              )}
              <Link href="/post-ad">Post Ad</Link>
              <Link href="/dashboard/my-ads">My Ads</Link>
              <span className="text-sm text-gray-500">
                Hi {session.user.name?.split(' ')[0]}
              </span>
              <button
                onClick={() => signOut()}
                className="cursor-pointer text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="cursor-pointer text-blue-600 font-medium"
            >
              Login
            </Link>
          )}
          {/* <button onClick={() => signIn('github')} className="text-blue-600">
            Login
          </button> */}
        </nav>
      </div>
    </header>
  );
}
