// components/HeroBanner.tsx
export default function HeroBanner() {
  return (
    <section className="bg-[url('/assets/hero.jpg')] bg-cover bg-center text-white py-28 px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Find What You Need. Fast.
      </h2>
      <p className="text-lg mb-6">
        Buy & Sell Cars, Phones, Property and More!
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
        Browse Listings
      </button>
    </section>
  );
}
