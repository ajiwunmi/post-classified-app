'use client';

import { useState, useEffect } from 'react';

interface SearchFilterProps {
  categories: string[];
  // eslint-disable-next-line no-unused-vars
  _onFilterChange: (category: string) => void;
  category: string; // Assuming you want to use category
}

export default function SearchFilter({
  categories,
  _onFilterChange,
  category, // Use category prop
}: SearchFilterProps) {
  const [selected, setSelected] = useState(category);

  useEffect(() => {
    setSelected(category); // Update selected when category prop changes
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelected(category);
    _onFilterChange(category);
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
