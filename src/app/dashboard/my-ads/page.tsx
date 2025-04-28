import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import Ad from '@/models/Ad';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';

export default async function MyAdsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  await connectDB();
  const myAds = await Ad.find({ userEmail: session.user.email });

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">My Ads</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myAds.map((ad: any) => (
            <ProductCard key={ad._id} data={ad} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
