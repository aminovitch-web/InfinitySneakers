"use client";

import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Currency from "@/components/currency";
import IconButton from "@/components/ui/icon-button";
import newWishlist from "@/actions/wishlist/new-wishlist";

interface ProductCard {
  data: any;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const session = useSession();
  const userId = session?.data?.user?.id ?? ""; // Ensure userId is always a string

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const liked = session?.data?.user?.wishlist.some(
        (item: any) => item.productId === data?.product?.id
      );

      setIsLiked(liked);
    };

    if (session?.data?.user?.id) {
      checkWishlist();
    }
  }, [session, data?.product?.id]);

  const handleWishlistClick = async () => {
    try {
      await newWishlist(userId, {
        userId: userId,
        productId: data?.product?.id,
      });
      setIsLiked(!isLiked);
      session.update({
        wishlist: session?.data?.user?.wishlist.some(
          (item: any) => item.productId !== data?.product?.id
        ),
      });
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="bg-transparent group rounded-xl border p-3 space-y-4">
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Link
          href={`/shop/${data?.product?.slug}/${data?.product?.id}`}
          aria-label="Single Product Page"
        >
          <Image
            src={data?.product?.images?.[0].url}
            alt="Image"
            fill
            sizes="30vw"
            className="aspect-square object-cover rounded-md"
          />
        </Link>

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Link
              href={`/shop/${data?.product?.slug}/${data?.product?.id}`}
              aria-label="Single Product Page"
              className="rounded-full flex items-center justify-center bg-white border border-InfinitySneakers shadow-md p-2 hover:scale-110 transition"
            >
              <FiShoppingCart className="text-gray-600" size={20} />
            </Link>

            {session?.data?.user !== undefined ? (
              <IconButton
                onClick={handleWishlistClick}
                icon={
                  isLiked ? (
                    <FaHeart className="text-red-600" size={20} />
                  ) : (
                    <FaRegHeart className="text-gray-600" size={20} />
                  )
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <Link
          href={`/shop/${data?.product?.slug}/${data?.product?.id}`}
          aria-label="Single Product Page"
          className="font-semibold text-lg"
        >
          {data?.product?.name}
        </Link>
        <p className="text-sm text-InfinitySneakers">
          {data?.product?.category.name}
        </p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.product?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
