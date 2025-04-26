'use client';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AdForm from '@/components/AdForm';
import Header from '@/components/_Header';
import Footer from '@/components/Footer';

export default async function PostAdPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) redirect('/login');

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <AdForm />
      </main>
      <Footer />
    </div>
  );
}
