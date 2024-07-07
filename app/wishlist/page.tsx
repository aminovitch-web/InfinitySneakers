"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import ProductList from "./_components/product-list";

const WishlistPage = () => {
  const session = useSession();

  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const checkWishlist = async () => {
      setWishlists(session.data?.user.wishlist);
    };

    if (session?.data?.user?.id) {
      checkWishlist();
    }
  }, [session]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-col gap-y-8 mt-10">
        <ProductList title="My Wishlist" items={wishlists} />
      </div>
    </div>
  );
};

export default WishlistPage;
