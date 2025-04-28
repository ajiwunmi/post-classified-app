'use client';
// import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  //  const { data: session } = useSession();
  const session = false;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TeorMarket</h1>

        <nav className="space-x-4">
          <a href="/">Home</a>
          <a href="/listings">Listings</a>
          {session ? (
            <>
              <a href="/post-ad">Post Ad</a>
              <a href="/dashboard/my-ads">My Ads</a>
              <span className="text-sm text-gray-500">
                Hi {session.user?.name}
              </span>
              <button onClick={() => signOut()} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="text-blue-600">
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
