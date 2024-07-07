"use client";

import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

import { Product } from "@/types";
import Currency from "@/components/currency";
import IconButton from "@/components/ui/icon-button";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  return (
    <div className="bg-transparent group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0].url}
          alt="Image"
          fill
          className="aspect-square object-cover rounded-md"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Link
              href={`/products/${data.id}`}
              className="rounded-full flex items-center justify-center bg-white border border-InfinitySneakers shadow-md p-2 hover:scale-110 transition"
            >
              <FiShoppingCart className="text-gray-600" size={20} />
            </Link>

            <IconButton
              onClick={() => {}}
              icon={<FaRegHeart className="text-gray-600" size={20} />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-InfinitySneakers">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
