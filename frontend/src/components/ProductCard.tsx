import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/api";

const ProductCard = ({ product }: { product: Product }) => {
  const image =
    product.image_url ||
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-forest/5 transition-all flex flex-col"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_new && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#4a7c59] text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
              New
            </span>
          </div>
        )}
        {product.category && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-forest shadow-sm uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-forest mb-2 group-hover:text-[#4a7c59] transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-forest/60 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        )}
        <div className="flex items-center gap-2 text-[#4a7c59] font-bold text-sm group-hover:gap-3 transition-all">
          <ShoppingBag className="h-4 w-4" />
          View Details
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
