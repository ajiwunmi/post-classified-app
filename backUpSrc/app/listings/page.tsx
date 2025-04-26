// app/listings/page.tsx
import React from 'react';
import Header from '@/components/_Header';
import Footer from '@/components/Footer';
// import ProductCard from '@/components/ProductCard';

// async function fetchAds() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads`, {
//     cache: 'no-store',
//   });
//   const data = await res.json();
//   return data.ads;
// }

export default async function ListingsPage() {
  // const ads = await fetchAds();

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">All Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* {ads.map((ad: any) => (
            <ProductCard key={ad._id} data={ad} />
          ))} */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
