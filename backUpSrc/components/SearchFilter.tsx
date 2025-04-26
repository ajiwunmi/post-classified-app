// components/SearchFilter.tsx
'use client';

import { useState } from 'react';

interface SearchFilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}

export default function SearchFilter({
  categories,
  onFilterChange,
}: SearchFilterProps) {
  const [selected, setSelected] = useState('All');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelected(category);
    onFilterChange(category);
  };

  return (
    <div className="mb-6">
      <label htmlFor="category" className="mr-4 font-medium">
        Filter by Category:
      </label>
      <select
        id="category"
        value={selected}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md text-sm"
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
