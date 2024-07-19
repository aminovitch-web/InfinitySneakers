"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import ProductList from "./_components/product-list";
import BreadcrumbComponent from "@/components/breadcrumb-component";

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

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Wishlist" },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <BreadcrumbComponent items={breadcrumbs} />
      <ProductList title="My Wishlist" items={wishlists} />
    </div>
  );
};

export default WishlistPage;
