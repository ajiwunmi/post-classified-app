import Image from "next/image";

// components/ProductCard.tsx
interface ProductProps {
  data: {
    id: number;
    title: string;
    price: string;
    image: string;
  };
}

export default function ProductCard({ data }: ProductProps) {
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition">
      <Image
        src={data.image}
        alt={data.title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg">{data.title}</h4>
        <p className="text-blue-600 font-bold mt-2">{data.price}</p>
      </div>
    </div>
  );
}
