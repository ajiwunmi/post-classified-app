// components/ProductCard.tsx
'use client';

import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-md shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg">{data.title}</h4>
        <p className="text-blue-600 font-bold mt-2">{data.price}</p>
      </div>
    </motion.div>
  );
}
