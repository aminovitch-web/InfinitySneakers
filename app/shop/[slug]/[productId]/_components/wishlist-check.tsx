"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import IconButton from "@/components/ui/icon-button";
import newWishlist from "@/actions/wishlist/new-wishlist";

const WishlistCheck = ({ product }: { product: any }) => {
  const session = useSession();
  const userId = session?.data?.user?.id ?? ""; // Ensure userId is always a string

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const liked = session?.data?.user?.wishlist.some(
        (item: any) => item.productId === product?.id
      );

      setIsLiked(liked);
    };

    if (session?.data?.user?.id) {
      checkWishlist();
    }
  }, [session, product.id]);

  const handleWishlistClick = async () => {
    try {
      await newWishlist(userId, {
        userId: userId,
        productId: product?.id,
      });
      setIsLiked(!isLiked);
      session.update({
        wishlist: session?.data?.user?.wishlist.some(
          (item: any) => item.productId !== product?.id
        ),
      });
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div>
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
  );
};

export default WishlistCheck;
