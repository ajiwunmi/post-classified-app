// components/Header.tsx
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TeorMarket</h1>
        <nav className="space-x-6 text-gray-700 text-sm">
          <a href="#" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            Categories
          </a>
          <a href="#" className="hover:text-blue-500">
            Post Ad
          </a>
        </nav>
      </div>
    </header>
  );
}
