// app/page.tsx
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { listings } from '@/data/mockListings';

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroBanner />
      <CategoryGrid />

      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
