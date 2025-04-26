// components/CategoryGrid.tsx
const categories = [
  { name: 'Electronics', icon: '📱' },
  { name: 'Cars', icon: '🚗' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Fashion', icon: '👗' },
];

export default function CategoryGrid() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Browse by Category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
