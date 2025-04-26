// app/listings/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/_Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/_ProductCard';
import SearchFilter from '@/components/SearchFilter';
import { listings } from '@/data/mockListings';

const categories = ['Electronics', 'Cars', 'Real Estate', 'Fashion'];

export default function ListingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredListings =
    selectedCategory === 'All'
      ? listings
      : listings.filter((item) => item.title.includes(selectedCategory));

  return (
    <div>
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Browse Listings</h2>

        <SearchFilter
          categories={categories}
          onFilterChange={setSelectedCategory}
        />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredListings.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
          {filteredListings.length === 0 && (
            <p className="text-gray-500 col-span-full">No results found.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
